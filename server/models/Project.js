import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title:        { type: String, required: true, trim: true },
    slug:         { type: String, required: true, unique: true, trim: true },
    eyebrow:      { type: String, default: '' },           // sub-headline / badge
    description:  { type: String, required: true },
    overview:     { type: String, default: '' },
    problem:      { type: String, default: '' },
    architecture: { type: String, default: '' },
    techStack:    { type: [String], default: [] },
    features:     { type: [String], default: [] },
    liveUrl:      { type: String, default: '' },
    githubUrl:    { type: String, default: '' },
    thumbnailUrl: { type: String, default: '' },          // Cloudinary URL
    category:     { type: String, default: 'Utility' },
    featured:     { type: Boolean, default: false },
    order:        { type: Number, default: 0 },
    accent:       { type: String, default: '' },          // decorative label
  },
  { timestamps: true },
);

// Index for deterministic sort order on the public API
projectSchema.index({ order: 1, createdAt: 1 });

export default mongoose.model('Project', projectSchema);
