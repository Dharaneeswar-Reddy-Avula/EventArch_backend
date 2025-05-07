import express from "express";
import { CreateWorkshop, deleteWorkshop, getAllWorkshops, getWorkshopbyId, updateWorkshop } from "../controllers/workshop.Controllers.js";
const router = express.Router();
router.post("/",CreateWorkshop)
router.get("/",getAllWorkshops)
router.get("/:id",getWorkshopbyId)
router.put("/:id",updateWorkshop)
router.delete("/:id",deleteWorkshop)
export default router;