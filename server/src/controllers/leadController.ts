import {

  Request,

  Response

} from "express";

import Lead from "../models/Lead";




// GET LEADS

export const getLeads = async (

  req: Request,

  res: Response

): Promise<void> => {

  try {

    const search =
      req.query.search as string;




    const status =
      req.query.status as string;




    const source =
      req.query.source as string;




    const page =
      Number(req.query.page) || 1;




    const limit = 5;




    const query: any = {};




    // SEARCH

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




    // FILTERS

    if (status) {

      query.status = status;

    }




    if (source) {

      query.source = source;

    }




    const total =
      await Lead.countDocuments(query);




    const leads =
      await Lead.find(query)

        .sort({

          createdAt: -1

        })

        .skip(

          (page - 1) * limit

        )

        .limit(limit);




    res.status(200).json({

      leads,

      currentPage: page,

      totalPages:
        Math.ceil(total / limit)

    });

  } catch (error) {

    res.status(500).json({

      message:
        "Server Error"

    });

  }

};




// CREATE LEAD

export const createLead = async (

  req: Request,

  res: Response

): Promise<void> => {

  try {

    const lead =
      await Lead.create(req.body);




    res.status(201).json(

      lead

    );

  } catch (error) {

    res.status(500).json({

      message:
        "Server Error"

    });

  }

};




// UPDATE LEAD

export const updateLead = async (

  req: Request,

  res: Response

): Promise<void> => {

  try {

    const updatedLead =
      await Lead.findByIdAndUpdate(

        req.params.id,

        req.body,

        {

          new: true

        }

      );




    res.status(200).json(

      updatedLead

    );

  } catch (error) {

    res.status(500).json({

      message:
        "Server Error"

    });

  }

};




// DELETE LEAD

export const deleteLead = async (

  req: Request,

  res: Response

): Promise<void> => {

  try {

    await Lead.findByIdAndDelete(

      req.params.id

    );




    res.status(200).json({

      message:
        "Lead deleted"

    });

  } catch (error) {

    res.status(500).json({

      message:
        "Server Error"

    });

  }

};




// EXPORT CSV

export const exportLeadsCSV = async (

  req: Request,

  res: Response

): Promise<void> => {

  try {

    const leads =
      await Lead.find();




    let csv =
      "Name,Email,Status,Source,Created At\n";




    leads.forEach((lead: any) => {

      csv +=

        `${lead.name},` +

        `${lead.email},` +

        `${lead.status},` +

        `${lead.source},` +

        `${new Date(

          lead.createdAt

        ).toLocaleString()}\n`;

    });




    res.header(

      "Content-Type",

      "text/csv"

    );




    res.attachment(

      "leads.csv"

    );




    res.send(csv);

  } catch (error) {

    res.status(500).json({

      message:
        "Server Error"

    });

  }

};