import express from "express";

import {

  createLead,

  getLeads,

  getSingleLead,

  updateLead,

  deleteLead,

  exportLeadsCSV

} from "../controllers/leadController";

import {

  protect,

  authorize

} from "../middleware/authMiddleware";

const router = express.Router();



// CREATE LEAD

router.post(

  "/",

  protect,

  createLead

);



// GET ALL LEADS
// SEARCH + FILTER + PAGINATION

router.get(

  "/",

  protect,

  getLeads

);



// EXPORT CSV

router.get(

  "/export/csv",

  protect,

  exportLeadsCSV

);



// GET SINGLE LEAD

router.get(

  "/:id",

  protect,

  getSingleLead

);



// UPDATE LEAD

router.put(

  "/:id",

  protect,

  updateLead

);



// DELETE LEAD
// ADMIN ONLY

router.delete(

  "/:id",

  protect,

  authorize("admin"),

  deleteLead

);



export default router;