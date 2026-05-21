import express from "express";

import {

  getLeads,

  createLead,

  updateLead,

  deleteLead,

  exportLeadsCSV

} from "../controllers/leadController";

import {

  protect

} from "../middleware/authMiddleware";

const router = express.Router();




// GET ALL LEADS

router.get(

  "/",

  protect,

  getLeads

);




// CREATE LEAD

router.post(

  "/",

  protect,

  createLead

);




// EXPORT CSV

router.get(

  "/export/csv",

  protect,

  exportLeadsCSV

);




// UPDATE LEAD

router.put(

  "/:id",

  protect,

  updateLead

);




// DELETE LEAD

router.delete(

  "/:id",

  protect,

  deleteLead

);




export default router;