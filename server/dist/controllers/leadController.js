"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportLeadsCSV = exports.deleteLead = exports.updateLead = exports.getSingleLead = exports.getLeads = exports.createLead = void 0;
const Lead_1 = __importDefault(require("../models/Lead"));
const csv_writer_1 = require("csv-writer");
// CREATE LEAD
const createLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lead = yield Lead_1.default.create(req.body);
        res.status(201).json(lead);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
});
exports.createLead = createLead;
// GET ALL LEADS
// SEARCH + FILTER + SORT + PAGINATION
const getLeads = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, source, search, sort, page = "1" } = req.query;
        // DYNAMIC QUERY OBJECT
        const query = {};
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
        const leads = yield Lead_1.default.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limit);
        // TOTAL COUNT
        const total = yield Lead_1.default.countDocuments(query);
        // RESPONSE
        res.status(200).json({
            total,
            currentPage: Number(page),
            totalPages: Math.ceil(total / limit),
            leads
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
});
exports.getLeads = getLeads;
// GET SINGLE LEAD
const getSingleLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lead = yield Lead_1.default.findById(req.params.id);
        if (!lead) {
            return res.status(404).json({
                message: "Lead not found"
            });
        }
        res.status(200).json(lead);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
});
exports.getSingleLead = getSingleLead;
// UPDATE LEAD
const updateLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lead = yield Lead_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!lead) {
            return res.status(404).json({
                message: "Lead not found"
            });
        }
        res.status(200).json(lead);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
});
exports.updateLead = updateLead;
// DELETE LEAD
const deleteLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lead = yield Lead_1.default.findByIdAndDelete(req.params.id);
        if (!lead) {
            return res.status(404).json({
                message: "Lead not found"
            });
        }
        res.status(200).json({
            message: "Lead deleted successfully"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
});
exports.deleteLead = deleteLead;
// EXPORT LEADS CSV
const exportLeadsCSV = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const leads = yield Lead_1.default.find();
        const csvStringifier = (0, csv_writer_1.createObjectCsvStringifier)({
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
        const header = csvStringifier.getHeaderString();
        const records = csvStringifier.stringifyRecords(leads);
        const csvData = header + records;
        res.header("Content-Type", "text/csv");
        res.attachment("leads.csv");
        return res.send(csvData);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
});
exports.exportLeadsCSV = exportLeadsCSV;
