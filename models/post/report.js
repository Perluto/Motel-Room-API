const mongoose = require("mongoose");
const Joi = require("joi");

const Report = mongoose.model(
  "Report",
  new mongoose.Schema({
    idUserRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    idPostRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    isConfirm: {
      type: Boolean,
      default: false,
      required: true,
    },
  })
);

function validateReport(report) {
  const schema = Joi.object({
    idUserRef: Joi.objectId().required(),
    idPostRef: Joi.objectId().required(),
    reason: Joi.string().required(),
    isConfirm: Joi.boolean(),
  });

  return schema.validate(report);
}

exports.Report = Report;
exports.validateReport = validateReport;
