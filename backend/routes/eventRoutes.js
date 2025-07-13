// ===== backend/routes/eventRoutes.js =====
import express from "express";
import multer from "multer";
import {
  createEvent,
  getEvents,
  deleteEvent,
  addComment,
  addReply,
  addGalleryImage,
} from "../controllers/eventController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post("/create", upload.single("poster"), createEvent);
router.get("/all", getEvents);
router.delete("/delete/:id", deleteEvent);
router.post("/comment/:id", addComment);
router.post("/reply/:id/:index", addReply);
router.post("/gallery/:id", upload.single("photo"), addGalleryImage);

export default router;

