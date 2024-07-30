const express = require("express");
const router = express.Router();
const formController = require("../controllers/form");
const verifyToken = require("../middlewares/verifyToken");

// Form Routes
router.get("/all/:folderId?", verifyToken, formController.getAllForms);
router.get("/single/:formId", verifyToken, formController.getFormById);
router.post("/:folderId?", verifyToken, formController.createForm);
router.put("/:formId", verifyToken, formController.updateFormDetails);
router.delete("/:formId", verifyToken, formController.deleteForm);
router.put("/:formId/view", formController.increaseFormView);
router.put("/:formId/start", formController.increaseStartCount);
router.put("/:formId/complete", formController.increaseCompletedCount);

// Form Fields
router.get("/:formId/formfields", verifyToken, formController.getAllFormFields);
router.get(
  "/:formId/field/:fieldSeq",
  verifyToken,
  formController.getFieldValue
);
router.post(
  "/:formId/formfields",
  verifyToken,
  formController.createFormFields
);

// User Responses
router.get(
  "/:formId/user-responses",
  verifyToken,
  formController.getAllUserResponses
);
router.post("/:formId/user-response", formController.createUserResponse);

module.exports = router;
