import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Notes.css'
import editIcon from '../assets/edit.png';
import deleteIcon from '../assets/delete.png';
import addIcon from '../assets/plus.png';


const Notes = () => {
  const [notes, setNotes] = useState([]);
 
const navigate=useNavigate();
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:8000/tasks"); // Ensure this URL works
        setNotes(res.data);
      
      
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotes();
  }, []); // Runs once when the component mounts

  const handleDelete=async(id)=>{
   
    try{
      await axios.delete(`http://localhost:8000/tasks/${id}`)
      window.location.reload();
     
    }
    catch(err){
      console.log(err);
    }
  };

  const handleUpdate=async(id)=>{
    navigate('/update', { state:  id });
    
  };
  const handleAdd=async()=>{
    navigate('/add');
  
  

    
  };
  return (
    <div className="note-container">
    <div className="header">
      <h1>Notes</h1>
      <button className="button-add" onClick={() => handleAdd()}>
        <img src={addIcon} alt="Add" />
      </button>
    </div>
    <div className="notes">
      {notes.length === 0 ? (
        <p>No items present</p>
      ) : (
        notes.map((note) => (
          <div key={note._id} className="note">
            <h1 className="heading">{note.header}</h1>
            <div className="sub">
              <h3 className="subT">{note.subText}</h3>
            </div>
            <h4 className="date">{note.date}</h4>
            <p className="tag">{note.tag}</p>
            <div className="button-edit-delete">
              <button className="button-delete" onClick={() => handleDelete(note._id)}>
                <img src={deleteIcon} alt="Delete" />
              </button>
              <button className="button-edit" onClick={() => handleUpdate(note._id)}>
                <img src={editIcon} alt="Edit" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
  );
};

export default Notes;
