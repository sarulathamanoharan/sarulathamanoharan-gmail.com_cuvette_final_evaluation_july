const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Form Schema
const formSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      required: true,
    },
    folderId: {
      type: Schema.Types.ObjectId,
      ref: "Folder",
    },
    views: {
      type: Number,
      default: 0,
    },
    start: {
      type: Number,
      default: 0,
    },
    completed: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Form = mongoose.model("Form", formSchema);

// Form Fields Schema
const formFieldsSchema = new Schema(
  {
    formId: {
      type: Schema.Types.ObjectId,
      ref: "Form",
      required: true,
    },
    formFields: [
      {
        seq: {
          type: Number,
          required: true,
        },
        elementType: {
          type: String,
          enum: ["bubble", "input", "start"],
          required: true,
        },
        type: {
          type: String,
        },
        displayValue: {
          type: String,
        },
        fieldValue: {
          type: String,
        },
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const FormField = mongoose.model("FormField", formFieldsSchema);

// User Response Schema
const userResponseSchema = new Schema(
  {
    formId: {
      type: Schema.Types.ObjectId,
      ref: "Form",
      required: true,
    },
    uniqueKey: {
      type: String,
    },
    formFieldsResponse: [
      {
        seq: {
          type: Number,
          required: true,
        },
        response: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const UserResponse = mongoose.model("UserResponse", userResponseSchema);

module.exports = { Form, FormField, UserResponse };
