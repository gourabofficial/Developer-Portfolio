import CV from "../model/cv.model.js";
import { uploadToCloudinary } from "../config/multer.js";

// Get active CV (public)
export const getActiveCV = async(req, res) => {
    try {
        const cv = await CV.findOne({ isActive: true }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            cv
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch CV"
        });
        console.log(error.message);
    }
}

// Get all CVs (admin)
export const getAllCVs = async(req, res) => {
    try {
        const cvs = await CV.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            cvs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch CVs"
        });
        console.log(error.message);
    }
}

// Upload CV (with Google Drive link)
export const uploadCV = async(req, res) => {
    try {
        const { driveLink, fileName } = req.body;

        if (!driveLink) {
            return res.status(400).json({
                success: false,
                message: "Please provide a Google Drive link"
            });
        }

        // Validate Google Drive link
        if (!driveLink.includes('drive.google.com')) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid Google Drive link"
            });
        }

        // Delete all previous CVs (auto-delete functionality)
        await CV.deleteMany({});

        // Create new CV entry
        const newCV = new CV({
            fileName: fileName || 'Resume',
            fileUrl: driveLink,
            isActive: true
        });

        await newCV.save();

        res.status(201).json({
            success: true,
            message: "CV link saved successfully. Previous CV deleted automatically.",
            cv: newCV
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to save CV link"
        });
        console.log(error.message);
    }
}

// Delete CV
export const deleteCV = async(req, res) => {
    try {
        const { id } = req.params;
        await CV.findByIdAndDelete(id);
        
        res.status(200).json({
            success: true,
            message: "CV deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete CV"
        });
        console.log(error.message);
    }
}

// Set active CV
export const setActiveCV = async(req, res) => {
    try {
        const { id } = req.params;
        
        // Deactivate all CVs
        await CV.updateMany({}, { isActive: false });
        
        // Activate selected CV
        const cv = await CV.findByIdAndUpdate(
            id,
            { isActive: true },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "CV set as active",
            cv
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to set active CV"
        });
        console.log(error.message);
    }
}
