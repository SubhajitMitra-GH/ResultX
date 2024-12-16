import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Update.css';


const Update = () => {
  const [notes, setnotes] = useState({ header: "", subText: "", date: new Date().toISOString().split('T')[0].toString(), tags: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const noteId = location.state;



  const handleChange = (e) => {
    setnotes((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEdit = async (e) => {
    
    console.log(noteId)
    e.preventDefault();
  

    try {
      await axios.put(`http://localhost:8000/tasks/${noteId}`, notes);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to update the note. Please try again.");
    }
  };

  return (
    <div>
      <div className="form">
        <h1>Enter new note info</h1>
        <input
          type="text"
          placeholder="Enter Note title"
          name="header"
          value={notes.header}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter Note subtitle"
          name="subText"
          value={notes.subText}
          onChange={handleChange}
        />
       
        <select name="tags" value={notes.tags} onChange={handleChange}>
          <option value="" disabled>Select a Tag</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Urgent">Urgent</option>
          <option value="Other">Other</option>
        </select>
        <button onClick={handleEdit}>Submit</button>
      </div>
    </div>
  );
};

export default Update;
