/**
 * Key-value store for simple site-wide config entries.
 * Currently used for the resume Google Drive URL.
 * key is unique — upsert on write.
 */
import mongoose from 'mongoose';

const siteConfigSchema = new mongoose.Schema(
  {
    key:   { type: String, required: true, unique: true },
    value: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model('SiteConfig', siteConfigSchema);
