/**
 * Site Settings Service
 * Business logic for site settings operations.
 */

const siteSettingsRepository = require("../repositories/siteSettingsRepository");
const { uploadLocalToCloudinary } = require("../config/cloudinary");
const { AppError } = require("../middleware/errorHandler");

class SiteSettingsService {
  async getSettings() {
    return await siteSettingsRepository.getSettings();
  }

  async updateSettings(data) {
    return await siteSettingsRepository.updateSettings(data);
  }

  async uploadLogo(file, currentSettings) {
    if (!file) {
      throw new AppError("No logo file provided", 400);
    }

    try {
      if (currentSettings?.logoPublicId) {
        try {
          const cloudinary = require("cloudinary").v2;
          await cloudinary.uploader.destroy(currentSettings.logoPublicId);
        } catch (destroyError) {
          console.error(
            "Failed to remove previous logo from Cloudinary",
            destroyError,
          );
        }
      }

      const result = await uploadLocalToCloudinary(file.path, "site-settings");

      return await siteSettingsRepository.updateLogo(
        result.secure_url,
        result.public_id,
      );
    } catch (error) {
      throw new AppError(`Logo upload failed: ${error.message}`, 500);
    }
  }
}

module.exports = new SiteSettingsService();
