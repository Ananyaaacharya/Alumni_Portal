import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import "../styles/Events.css";

function Events() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [galleryFile, setGalleryFile] = useState(null);
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/events/all");
      setEvents(res.data);
    } catch (err) {
      alert("Failed to load events");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("poster", file);
      formData.append("description", description);
      formData.append("date", date);
      formData.append("createdBy", role);

      await axios.post("http://localhost:5000/events/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Event posted!");
      setFile(null);
      setPreview("");
      setDescription("");
      setDate("");
      setShowForm(false);
      fetchEvents();
    } catch (err) {
      alert("Failed to post event");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await axios.delete(`http://localhost:5000/events/delete/${id}`);
      alert("Event deleted successfully");
      fetchEvents();
    } catch (err) {
      alert("Failed to delete event");
    }
  };

  const handleGalleryUpload = async (eventId) => {
    if (!galleryFile) return;
    const formData = new FormData();
    formData.append("image", galleryFile);
    try {
      await axios.post(`http://localhost:5000/events/${eventId}/gallery`, formData);
      setGalleryFile(null);
      fetchEvents();
    } catch (err) {
      alert("Failed to upload photo");
    }
  };

  return (
    <>
      <Navbar />
      <div className="events-container">
        <div className="event-list">
          {events.map((event) => {
            const isPast = new Date(event.date) < new Date();
            return (
              <div className={`event-card ${isPast ? "past" : "upcoming"}`} key={event._id}>
                <div className="dropdown">
                  <button className="dropdown-toggle">⋮</button>
                  <div className="dropdown-menu">
                    {isPast && (
                      <label>
                        <input
                          type="file"
                          hidden
                          onChange={(e) => setGalleryFile(e.target.files[0])}
                        />
                        <button onClick={() => handleGalleryUpload(event._id)}>
                          Upload Photo
                        </button>
                      </label>
                    )}
                    {role === "admin" && (
                      <button onClick={() => handleDelete(event._id)}>Delete Post</button>
                    )}
                  </div>
                </div>

                <img src={`http://localhost:5000${event.poster}`} alt="Event Poster" />
                <p>{event.description}</p>
                <p><strong>Date:</strong> {new Date(event.date).toDateString()}</p>

                {event.gallery?.length > 0 && (
                  <div className="gallery">
                    {event.gallery.map((img, i) => (
                      <img
                        key={i}
                        src={`http://localhost:5000${img}`}
                        alt="Gallery"
                        className="gallery-img"
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {role === "admin" && (
          <>
            <button className="add-button" onClick={() => setShowForm(true)}>+</button>
            {showForm && (
              <div className="form-modal">
                <div className="form-card">
                  <h3>Post New Event</h3>
                  <form onSubmit={handleSubmit}>
                    <input type="file" accept="image/*" onChange={handleImageChange} required />
                    {preview && <img src={preview} alt="Preview" className="preview" />}
                    <textarea
                      placeholder="Event Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                    <div className="form-actions">
                      <button type="submit">Post</button>
                      <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Events;
