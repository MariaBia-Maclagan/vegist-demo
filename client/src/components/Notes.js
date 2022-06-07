import React, { useState } from "react";


export default function Notes({favorite}){
const [noteInput, setNoteInput] = useState ("");
const [addNote, setAddNote] = useState ([]);


const getValue= (e)=>{
 let note =(e.target.value)
 setNoteInput(note)
 
};

const handleSubmitNote=(favorite)=>{
    postNote(favorite);
}

const postNote =(favorite)=>{
   // console.log(favorite)
    
    fetch(`api/vegist/${favorite}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
           { favoriteId : favorite,
            notes: noteInput})
    })
   .then(response => response.json())
   .then(updateNotes => {
       setAddNote(updateNotes);
       console.log(addNote)
   })
   .catch(err => console.error(err));
}

const handleGetNote =(favorite) =>{
      getNote(favorite);
}

const getNote =(favorite)=>{
    fetch(`api/notes/${favorite}`)
        .then(res => res.json())
        .then(response =>{ setAddNote(response)})
        .catch(err => console.error(err))
    
}

    return (
        <div >
            <ul className="list mt-3 ">
                {addNote.filter( note => note.favoritesId === favorite ).map( note => {
                    return(
                        <li className="d-flex" key={note.id} >
                            {note.notes}
                        </li>
                    )
                })}
            </ul>
                
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
                onClick={()=>handleSubmitNote(favorite)}>add note</button>
                <button className="btn" type="submit"
                onClick={()=>handleGetNote(favorite)}>view note</button>
          
            </div>
            </div>
        </div>
                
            
        
        </div>
    )
}