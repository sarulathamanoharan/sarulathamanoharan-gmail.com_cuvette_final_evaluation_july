const express = require("express");
const router = express.Router();
const folderController = require("../controllers/folder");
const verifyToken = require("../middlewares/verifyToken");

// Folder Routes
router.get("/", verifyToken, folderController.getFolders);
router.post("/", verifyToken, folderController.createFolder);
router.put("/:folderId", verifyToken, folderController.updateFolderName);
router.delete("/:folderId", verifyToken, folderController.deleteFolder);

module.exports = router;
