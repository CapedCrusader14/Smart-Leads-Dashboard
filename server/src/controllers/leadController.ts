import { Request, Response } from "express";
import Lead from "../models/Lead";

import {
  createObjectCsvStringifier
} from "csv-writer";



// CREATE LEAD

export const createLead = async (
  req: Request,
  res: Response
) => {

  try {

    const lead = await Lead.create(req.body);

    res.status(201).json(lead);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};



// GET ALL LEADS
// SEARCH + FILTER + SORT + PAGINATION

export const getLeads = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      status,
      source,
      search,
      sort,
      page = "1"
    } = req.query as {
      status?: string;
      source?: string;
      search?: string;
      sort?: string;
      page?: string;
    };



    // DYNAMIC QUERY OBJECT

    const query: any = {};



    // FILTER BY STATUS

    if (status) {

      query.status = status;

    }



    // FILTER BY SOURCE

    if (source) {

      query.source = source;

    }



    // SEARCH BY NAME OR EMAIL

    if (search) {

      query.$or = [

        {
          name: {
            $regex: search,
            $options: "i"
          }
        },

        {
          email: {
            $regex: search,
            $options: "i"
          }
        }

      ];

    }



    // SORTING

    let sortOption = {};



    // LATEST FIRST

    if (sort === "latest") {

      sortOption = {
        createdAt: -1
      };

    }



    // OLDEST FIRST

    if (sort === "oldest") {

      sortOption = {
        createdAt: 1
      };

    }



    // PAGINATION

    const limit = 10;

    const skip = (Number(page) - 1) * limit;



    // FETCH LEADS

    const leads = await Lead.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);



    // TOTAL COUNT

    const total = await Lead.countDocuments(query);



    // RESPONSE

    res.status(200).json({

      total,

      currentPage: Number(page),

      totalPages: Math.ceil(total / limit),

      leads

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};



// GET SINGLE LEAD

export const getSingleLead = async (
  req: Request,
  res: Response
) => {

  try {

    const lead = await Lead.findById(
      req.params.id
    );

    if (!lead) {

      return res.status(404).json({
        message: "Lead not found"
      });

    }

    res.status(200).json(lead);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};



// UPDATE LEAD

export const updateLead = async (
  req: Request,
  res: Response
) => {

  try {

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    if (!lead) {

      return res.status(404).json({
        message: "Lead not found"
      });

    }

    res.status(200).json(lead);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};



// DELETE LEAD

export const deleteLead = async (
  req: Request,
  res: Response
) => {

  try {

    const lead = await Lead.findByIdAndDelete(
      req.params.id
    );

    if (!lead) {

      return res.status(404).json({
        message: "Lead not found"
      });

    }

    res.status(200).json({
      message: "Lead deleted successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};



// EXPORT LEADS CSV

export const exportLeadsCSV = async (
  req: Request,
  res: Response
) => {

  try {

    const leads = await Lead.find();



    const csvStringifier =
      createObjectCsvStringifier({

        header: [

          {
            id: "name",
            title: "NAME"
          },

          {
            id: "email",
            title: "EMAIL"
          },

          {
            id: "status",
            title: "STATUS"
          },

          {
            id: "source",
            title: "SOURCE"
          }

        ]

      });



    const header =
      csvStringifier.getHeaderString();

    const records =
      csvStringifier.stringifyRecords(leads);

    const csvData =
      header + records;



    res.header(
      "Content-Type",
      "text/csv"
    );

    res.attachment("leads.csv");

    return res.send(csvData);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};