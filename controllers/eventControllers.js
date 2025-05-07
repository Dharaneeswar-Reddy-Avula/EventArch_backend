import Event from "../models/events.schema.js";
import EventReg from "../models/EventReg.schema.js";
export const createEvent = async (req, res) => {
  try {
    const { category, name, organisedby, venue, time, image } = req.body;
    if (!category || !name || !organisedby || !venue || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const event = new Event({
      category,
      name,
      organisedby,
      venue,
      time,
      image,
    });
    await event.save();
    res.status(201).json({ message: "Event Created Successfully", event });
  } catch (error) {
    res.status(500).json({ message: "Server Erroe", error: error.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const getEventById = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id); // Fix: Use findById
      if (!event) {
        return res.status(404).json({ message: "Event Not Found" });
      }
      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };
export const updateEvent = async (req, res) => {
  try {
    const { category, name, organisedby, venue, time, image } = req.body;
    const updateEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { category, name, organisedby, venue, time, image },
      { new: true, runValidators: true }
    );
    if (!updateEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "server Error", error: error.message });
  }
};
export const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getEventRegistrations = async (req, res) => {
    try {
      const eventId = req.params.id;
      console.log("Fetching registrations for eventId:", eventId); // Debug log
      const registrations = await EventReg.find({ EventId: eventId }).populate("EventId");
      console.log("Found registrations:", registrations); // Debug log
      if (!registrations || registrations.length === 0) {
        return res.status(404).json({ message: "No registrations found for this event" });
      }
      res.status(200).json(registrations);
    } catch (error) {
      console.error("Error in getEventRegistrations:", error); // Improved error logging
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
export const registerEvent = async (req, res) => {
    try {
      const { IdNum, name } = req.body;
      const eventId = req.params.id; // Get event ID from URL
  
      if (!IdNum || !name) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Check if event exists
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      // Create registration
      const newRegistration = new EventReg({
        IdNum,
        EventId: eventId,
        name,
      });
  
      await newRegistration.save();
      res.status(201).json({ message: "Registered Successfully!", registration: newRegistration });
    } catch (error) {
      console.error("Registration Error:", error);
      res.status(500).json({ message: "Registration Failed", error: error.message });
    }
  };
  export const deleteEventRegistration = async (req, res) => {
    try {
      const registrationId = req.params.registrationId;
      const deletedRegistration = await EventReg.findByIdAndDelete(registrationId);
      if (!deletedRegistration) {
        return res.status(404).json({ message: "Registration not found" });
      }
      res.status(200).json({ message: "Registration deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };