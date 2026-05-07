/**
 * Document Re-upload Controller
 * Business logic for document re-upload operations
 */

const reuploadService = require("../services/reuploadService");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

class ReuploadController {
  /**
   * Re-upload a document
   */
  reuploadDocument = asyncHandler(async (req, res) => {
    const { documentId } = req.body;
    const file = req.file;
    const userEmail = req.user.email;

    if (!documentId) {
      return ApiResponse.error(res, "Document ID is required", 400);
    }

    if (!file) {
      return ApiResponse.error(res, "File is required", 400);
    }

    const result = await reuploadService.reuploadDocument(documentId, file, userEmail);

    return ApiResponse.success(
      res,
      result,
      "Document re-uploaded successfully",
    );
  });
}

module.exports = new ReuploadController();
