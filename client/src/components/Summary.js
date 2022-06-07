import React, { useState } from "react";

export default function Summary({recipeId}){
    const [summary, setSummary] = useState ("");
    const [viewInfo, setViewInfo] = useState (true);


const showSummary =  (recipeId) =>{
    setViewInfo(!viewInfo);
    // console.log(viewInfo)
    fetch("/api/info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipeId: recipeId }),
      })
      
        .then(res => res.json())
        
        .then((data) => {
          setSummary(data);
        })
        
        .catch((err) => console.log(err));
     
    };

 

    return(
      <div >
      <div className="row">
        <div className="col">
        <div >
        <button type="submit" className="btn--info" onClick={() =>showSummary(recipeId)}> { viewInfo ? "show more" : "show less" }</button>
        <div className="col"> 
            {!viewInfo &&  <div className="content" dangerouslySetInnerHTML={{__html: summary.summary}}></div> } 
        
        </div>
        </div>
        </div>
        </div>
        </div>
    )

    }