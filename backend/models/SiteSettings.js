const mongoose = require("mongoose");

const socialLinksSchema = new mongoose.Schema(
  {
    facebook: {
      type: String,
      trim: true,
      default: "",
    },
    twitter: {
      type: String,
      trim: true,
      default: "",
    },
    linkedin: {
      type: String,
      trim: true,
      default: "",
    },
    instagram: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false },
);

const siteSettingsSchema = new mongoose.Schema(
  {
    websiteTitle: {
      type: String,
      default: "Wiser Consulting",
      trim: true,
    },
    emailAddress: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    phoneNumber: {
      type: String,
      trim: true,
      default: "",
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
    logoUrl: {
      type: String,
      default: null,
    },
    logoPublicId: {
      type: String,
      default: null,
    },
    socialLinks: {
      type: socialLinksSchema,
      default: {},
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("SiteSettings", siteSettingsSchema);
