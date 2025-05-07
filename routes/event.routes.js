import express from "express";
import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent, registerEvent, getEventRegistrations, deleteEventRegistration } from "../controllers/eventControllers.js";

const router = express.Router();

router.post("/", createEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);
router.post("/:id/register", registerEvent);
router.get("/:id/register", getEventRegistrations);
router.delete("/:id/register/:registrationId", deleteEventRegistration); // Add delete route

export default router;