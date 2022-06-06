import React, { useState } from "react";


export default function Notes(){
const [noteInput, setNoteInput] = useState ("");


const getValue= (e)=>{
 let note =(e.target.value)
 setNoteInput(note)
 
};

const handleSubmitNote=(e)=>{
    e.preventDefault();
    postNote();
}

const postNote =()=>{

}
    return (
        <div className="d-flex flex-row mt-3 justify-content-center">
            <div className="p-2 ">
                <div className="input-group">
                <input className="form-control"
                type="text"
                onChange={getValue}
                value={noteInput}
                name="note"></input>
               
            <button className="btn"
            type="submit"
            onClick={handleSubmitNote}>add note</button>
          
            </div>
            </div>
        </div>
    )
}