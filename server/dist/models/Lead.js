"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const leadSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["New", "Contacted", "Qualified", "Lost"],
        default: "New"
    },
    source: {
        type: String,
        enum: ["Website", "Instagram", "Referral"],
        required: true
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model("Lead", leadSchema);
