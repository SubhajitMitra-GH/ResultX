import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <div>
        <h1>Notes</h1>
                  <button className='button-add' onClick={() => handleAdd()}>Add</button>

    </div>
  )
}

export default Navbar