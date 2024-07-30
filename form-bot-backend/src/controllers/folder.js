const { Folder } = require("../models//folder");

const getFolders = async (req, res, next) => {
  try {
    const { userId } = req.body;

    const folders = await Folder.find({ createdBy: userId }).select("name");

    if (!folders || folders.length === 0) {
      return res.status(204).json({
        success: false,
        message: "No folders found for this user.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Folders fetched successfully.",
      folders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

const createFolder = async (req, res, next) => {
  try {
    const { userId, name } = req.body;

    const ifExists = await Folder.findOne({
      name: { $regex: name, $options: "i" },
    });

    if (ifExists) {
      return res.status(204).json({
        success: false,
        message: "Folder with the same name already exists.",
      });
    }

    const folder = new Folder({
      createdBy: userId,
      name,
    });

    await folder.save();

    return res.status(201).json({
      success: true,
      message: "Folder created successfully.",
      data: folder,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

const updateFolderName = async (req, res, next) => {
  try {
    const { folderId } = req.params;
    const { name } = req.body;

    if (!folderId) {
      return res.status(204).json({
        success: false,
        message: "Folder ID is required.",
      });
    }

    const folder = await Folder.findById({ _id: folderId });

    if (!folder) {
      return res.status(204).json({
        success: false,
        message: "Folder not found.",
      });
    }

    folder.name = name;

    await folder.save();

    return res.status(200).json({
      success: true,
      message: "Folder name updated successfully.",
      folder,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

const deleteFolder = async (req, res, next) => {
  try {
    const { folderId } = req.params;

    if (!folderId) {
      return res.status(204).json({
        success: false,
        message: "Folder ID is required.",
      });
    }

    const folder = await Folder.findById({ _id: folderId });

    if (!folder) {
      return res.status(204).json({
        success: false,
        message: "Folder not found.",
      });
    }

    await folder.deleteOne({ _id: folderId });

    return res.status(200).json({
      success: true,
      message: "Folder deleted successfully.",
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
  createFolder,
  updateFolderName,
  deleteFolder,
  getFolders,
};
