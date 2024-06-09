import { useEffect, useState } from "react";
import React from "react";
import MDEditor from '@uiw/react-md-editor';
import "./App.css"

export default function App() {
  const [notes,setNotes]=useState([{heading:"# Enter title here",body:"# Enter title here"}]);
  const [connect,setConnect]=useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem("notes")){
    setNotes(JSON.parse(localStorage.getItem("notes")))
    
    }
    else
    setIsVisible(true)
  },[])
  useEffect(()=>{
    if(notes.length>1 || notes[0].heading.length!=notes[0].body.length)
    localStorage.setItem("notes",JSON.stringify(notes));
  },[notes])

  return (
    <>
    {isVisible?(<div style={{height:"100vh",position:"static",zIndex:"3",display:"flex",alignItems:"center",flexDirection:"column" ,justifyContent:"center",color:"black",fontSize:"2rem"}}><p>You have no notes</p><p style={{background:"#3c91e6",color:"white",padding:"3vh",borderRadius:"5px"}} onClick={() => setIsVisible(!isVisible)}>Create one now</p></div>):null}
    <main style={{display:"flex",gap:"1vw"}}>
      <div style={{background:"#f7f7ff",width:"18%"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <h1>Notes</h1>
          <p className="add" style={{cursor:"pointer"}} onClick={()=>{let arr=[...notes];arr.push({heading:"# Enter title here",body:"# Enter title here"});setNotes(arr)}}><i className="fa-solid fa-plus"></i></p>
        </div>
        
        <div style={{borderRadius:"5px",background:"#3c91e6"}}>
          {
            notes.map((ele,idx)=>{
              return(
                <div key={idx} style={{display:"flex",justifyContent:"space-between",padding:"1vh",}} onClick={()=>{setConnect(idx)}}>
                  <h2 style={{color:"white"}}>{ele.heading}</h2>
                  <p style={{cursor:"pointer"}} onClick={()=>{let arr=[...notes];arr.splice(idx,1);setNotes(arr)}}><i className="fa-solid fa-trash-can"></i></p>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="container" style={{flexGrow:"1"}}>
        <MDEditor
          value={notes[connect].body}
          onChange={(e)=>{let arr=[...notes];arr[connect].body=e;arr[connect].heading=e.split("\n")[0];setNotes(arr)}} 
          height="80vh"
        />
        <MDEditor.Markdown source={notes[connect].body} style={{ whiteSpace: 'pre-wrap' }} />
      </div>
    </main>
    </>
  );
}