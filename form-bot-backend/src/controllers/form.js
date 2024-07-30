const { Form, FormField, UserResponse } = require("../models/form");
const { Folder } = require("../models/folder");
const mongoose = require("mongoose");

const getAllForms = async (req, res, next) => {
  try {
    const { folderId } = req.params;
    const { userId } = req.body;

    const forms = folderId
      ? await Form.find({ folderId: folderId })
      : await Form.find({ createdBy: userId });

    if (!forms || forms.length === 0) {
      return res.status(204).json({
        success: false,
        message: "No forms found in this folder.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Forms fetched successfully.",
      forms,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

const getFormById = async (req, res, next) => {
  try {
    const { formId } = req.params;

    if (!formId) {
      return res.status(204).json({
        success: false,
        message: "Form ID is required.",
      });
    }

    const form = await Form.findById({ _id: formId });

    if (!form) {
      return res.status(204).json({
        success: false,
        message: "Form not found.",
      });
    }

    const completionRate =
      form.completed > 0
        ? `${Math.round(
            (parseInt(form.completed) / parseInt(form.start)) * 100
          )}%`
        : "0%";

    return res.status(200).json({
      success: true,
      message: "Form fetched successfully.",
      form: {
        _id: form._id,
        name: form.name,
        theme: form.theme,
        views: form.views,
        start: form.start,
        completionRate,
        completed: form.completed,
        createdBy: form.createdBy,
        createdAt: form.createdAt,
        updatedAt: form.updatedAt,
        __v: form.__v,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

const createForm = async (req, res, next) => {
  try {
    const { folderId } = req.params;
    const { userId, name, theme } = req.body;

    if (folderId) {
      const folder = await Folder.findById({ _id: folderId });

      if (!folder) {
        return res.status(204).json({
          success: false,
          message: "Folder not found.",
        });
      }
    }

    const isFormExists = await Form.find({
      name: name,
      createdBy: userId,
    });

    if (isFormExists.length > 0) {
      return res.status(204).json({
        success: false,
        message: "Form with the same name already exists in this folder.",
      });
    }

    const form = new Form({
      name,
      theme,
      folderId,
      createdBy: userId,
    });

    await form.save();

    return res.status(201).json({
      success: true,
      message: "Form created successfully.",
      data: form,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

const updateFormDetails = async (req, res, next) => {
  try {
    const { formId } = req.params;
    const { name, theme } = req.body;

    if (!formId) {
      return res.status(204).json({
        success: false,
        message: "Form ID is required.",
      });
    }

    const form = await Form.findById({ _id: formId });

    if (!form) {
      return res.status(204).json({
        success: false,
        message: "Form not found.",
      });
    }

    if (form.name === name && form.theme === theme) {
      return res.status(204).json({
        success: false,
        message: "No changes made to the form.",
      });
    }

    form.name = name;
    form.theme = theme;

    await form.save();

    return res.status(200).json({
      success: true,
      message: "Form name updated successfully.",
      form,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

const deleteForm = async (req, res, next) => {
  try {
    const { formId } = req.params;

    if (!formId) {
      return res.status(204).json({
        success: false,
        message: "Form ID is required.",
      });
    }

    const form = await Form.findById({ _id: formId });

    if (!form) {
      return res.status(204).json({
        success: false,
        message: "Form not found.",
      });
    }

    await form.deleteOne({ _id: formId });

    return res.status(200).json({
      success: true,
      message: "Form deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

const increaseFormView = async (req, res, next) => {
  try {
    const { formId } = req.params;

    if (!formId) {
      return res.status(204).json({
        success: false,
        message: "Form ID is required.",
      });
    }

    const form = await Form.findByIdAndUpdate(
      { _id: formId },
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!form) {
      return res.status(204).json({
        success: false,
        message: "Form not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Form viewed count increased successfully.",
      form,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

const increaseStartCount = async (req, res, next) => {
  try {
    const { formId } = req.params;

    if (!formId) {
      return res.status(204).json({
        success: false,
        message: "Form ID is required.",
      });
    }

    const form = await Form.findByIdAndUpdate(
      { _id: formId },
      { $inc: { start: 1 } },
      { new: true }
    );

    if (!form) {
      return res.status(204).json({
        success: false,
        message: "Form not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Form started count increased successfully.",
      form,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

const increaseCompletedCount = async (req, res, next) => {
  try {
    const { formId } = req.params;

    if (!formId) {
      return res.status(204).json({
        success: false,
        message: "Form ID is required.",
      });
    }

    const form = await Form.findByIdAndUpdate(
      { _id: formId },
      { $inc: { completed: 1 } },
      { new: true }
    );

    if (!form) {
      return res.status(204).json({
        success: false,
        message: "Form not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Form completed count increased successfully.",
      form,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

// FormFields Controller Methods
const getAllFormFields = async (req, res, next) => {
  try {
    const { formId } = req.params;

    if (!formId) {
      return res.status(204).json({
        success: false,
        message: "Form ID is required.",
      });
    }

    const formField = await FormField.findOne({ formId: formId });

    if (!formField) {
      return res.status(204).json({
        success: false,
        message: "Form field not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Form fields fetched successfully.",
      formFields: formField.formFields,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

const createFormFields = async (req, res, next) => {
  try {
    const { formId } = req.params;
    const { userId, formFields } = req.body;

    if (!formId) {
      return res.status(204).json({
        success: false,
        message: "Form ID is required.",
      });
    }

    if (!formFields || formFields.length === 0) {
      return res.status(204).json({
        success: false,
        message: "Form fields are required.",
      });
    }

    const form = await Form.findById(formId);

    if (!form) {
      return res.status(204).json({
        success: false,
        message: "Form not found.",
      });
    }

    let formField = await FormField.findOne({ formId });

    if (!formField) {
      // If no form field exists, create a new one
      formField = new FormField({
        formId,
        createdBy: userId,
        formFields,
      });
    } else {
      // Replace existing form fields with new form fields from the request body
      formField.formFields = formFields;
      formField.updatedBy = userId;
      formField.updatedAt = new Date();
    }

    await formField.save();

    return res.status(201).json({
      success: true,
      message: "Form field created/updated successfully.",
      data: formField,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

// User Response Controller Methods
const createUserResponse = async (req, res, next) => {
  try {
    const { formId } = req.params;
    const { response, seq, uniqueKey } = req.body;

    if (!response || !seq) {
      return res.status(204).json({
        success: false,
        message: "Seq and response are required.",
      });
    }

    const form = await Form.findById(formId);

    if (!form) {
      return res.status(204).json({
        success: false,
        message: "Form not found.",
      });
    }

    let userResponse = await UserResponse.findOne({ formId, uniqueKey });

    if (userResponse) {
      userResponse.formFieldsResponse.push({ response, seq });
    } else {
      userResponse = new UserResponse({
        formId,
        uniqueKey,
        formFieldsResponse: [{ response, seq }],
      });
    }

    await userResponse.save();

    return res.status(201).json({
      success: true,
      message: "User response created successfully.",
      userResponse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

const getAllUserResponses = async (req, res, next) => {
  try {
    const { formId } = req.params;

    if (!formId) {
      return res.status(204).json({
        success: false,
        message: "Form ID is required.",
      });
    }

    const form = await Form.findById(formId);

    if (!form) {
      return res.status(204).json({
        success: false,
        message: "Form not found.",
      });
    }

    const userResponses = await UserResponse.find({ formId });

    if (userResponses.length === 0) {
      return res.status(204).json({
        success: false,
        message: "No user responses found for this form.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User responses fetched successfully.",
      userResponses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

const getFieldValue = async (req, res, next) => {
  try {
    const { formId, fieldSeq } = req.params;

    if (!formId || !fieldSeq) {
      return res.status(204).json({
        success: false,
        message: "Form ID and seq are required.",
      });
    }

    const formField = await FormField.findOne({ formId });

    if (!formField) {
      return res.status(204).json({
        success: false,
        message: "Form field not found.",
      });
    }

    const formFields = formField.formFields.find(
      (field) => field.seq === parseInt(fieldSeq)
    );

    if (!formFields) {
      return res.status(204).json({
        success: false,
        message: "Field value not found for this form.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Field value fetched successfully.",
      fieldValue: formFields.fieldValue,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

module.exports = {
  createForm,
  updateFormDetails,
  deleteForm,
  getAllForms,
  getFormById,
  increaseFormView,
  increaseStartCount,
  increaseCompletedCount,
  createFormFields,
  getAllFormFields,
  createUserResponse,
  getAllUserResponses,
  getFieldValue,
};
