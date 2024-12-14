import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notes = () => {
  const [notes, setNotes] = useState([]);

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

  return (
    <div>
      <div className='notes'>
        {notes.map((note) => (
          <div key={note._id} className='note'>
           { console.log(note._id)}
            <h1>{note.header}</h1>
            <h3>{note.subText}</h3>
            <h4>{note.date}</h4>
            <p>{note.tag}</p>
            <button onClick={()=>handleDelete(note._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
