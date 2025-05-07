import Workshop from "../models/workshop.schema.js";

// Create Workshop
export const CreateWorkshop = async (req, res) => {
    try {
        const { category, name, organisedby, venue, date, time, image } = req.body;
        if (!category || !name || !organisedby || !venue || !date || !time || !image) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const workshop = new Workshop({ category, name, organisedby, venue, date, time, image });
        await workshop.save();
        res.status(201).json({ message: "Workshop Created Successfully", workshop });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// Get All Workshops
export const getAllWorkshops = async (req, res) => {
    try {
        const workshops = await Workshop.find().sort({ createdAt: -1 });
        res.status(200).json(workshops);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// Get Workshop by ID (Fixed)
export const getWorkshopbyId = async (req, res) => {
    try {
        const workshop = await Workshop.findById(req.params.id); // Fixed here
        if (!workshop) {
            return res.status(404).json({ message: "Workshop Not Found" });
        }
        res.status(200).json(workshop);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// Update Workshop (Fixed)
export const updateWorkshop = async (req, res) => {
    try {
        const { category, name, organisedby, venue, date, time, image } = req.body;
        const updatedWorkshop = await Workshop.findByIdAndUpdate(
            req.params.id, 
            { category, name, organisedby, venue, date, time, image },
            { new: true } // Return updated workshop
        );
        if (!updatedWorkshop) {
            return res.status(404).json({ message: "Workshop Not Found" });
        }
        res.status(200).json({ message: "Workshop Updated Successfully", updatedWorkshop });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// Delete Workshop (Fixed)
export const deleteWorkshop = async (req, res) => {
    try {
        const deletedWorkshop = await Workshop.findByIdAndDelete(req.params.id); // Fixed here
        if (!deletedWorkshop) {
            return res.status(404).json({ message: "Workshop Not Found" });
        }
        res.status(200).json({ message: "Workshop Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
