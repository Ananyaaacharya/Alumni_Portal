// ===== backend/controllers/eventController.js =====
import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  try {
    const { description, date, createdBy } = req.body;
    const poster = `/uploads/${req.file.filename}`;

    const newEvent = new Event({ poster, description, date, createdBy });
    await newEvent.save();
    res.status(201).json({ message: "Event created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create event" });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Event.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete event" });
  }
};

export const addComment = async (req, res) => {
  const { id } = req.params;
  const { user, text } = req.body;
  const event = await Event.findById(id);
  event.comments.push({ user, text, replies: [] });
  await event.save();
  res.json({ message: "Comment added" });
};

export const addReply = async (req, res) => {
  const { id, index } = req.params;
  const { admin, text } = req.body;
  const event = await Event.findById(id);
  event.comments[index].replies.push({ admin, text });
  await event.save();
  res.json({ message: "Reply added" });
};

export const addGalleryImage = async (req, res) => {
  const { id } = req.params;
  const photo = `/uploads/${req.file.filename}`;
  const event = await Event.findById(id);
  event.gallery.push(photo);
  await event.save();
  res.json({ message: "Gallery image added" });
};

