"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const leadController_1 = require("../controllers/leadController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// CREATE LEAD
router.post("/", authMiddleware_1.protect, leadController_1.createLead);
// GET ALL LEADS
// SEARCH + FILTER + PAGINATION
router.get("/", authMiddleware_1.protect, leadController_1.getLeads);
// EXPORT CSV
router.get("/export/csv", authMiddleware_1.protect, leadController_1.exportLeadsCSV);
// GET SINGLE LEAD
router.get("/:id", authMiddleware_1.protect, leadController_1.getSingleLead);
// UPDATE LEAD
router.put("/:id", authMiddleware_1.protect, leadController_1.updateLead);
// DELETE LEAD
// ADMIN ONLY
router.delete("/:id", authMiddleware_1.protect, (0, authMiddleware_1.authorize)("admin"), leadController_1.deleteLead);
exports.default = router;
