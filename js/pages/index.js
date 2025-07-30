import { createHeaderSection } from "../components/header.js";

import {renderGameUI} from "../components/render.js"

document.addEventListener('DOMContentLoaded',()=>{
     createHeaderSection()
    

 const dummyCharacter = { name:"", img: "" };
  const dummyScore = 5;
  const isCorrect = true;

  const conHandler=()=> {
    console.log("con clicked");
    
  }
  
  const restartHandler=()=> {
    console.log("Restart clicked");
    
  }

  renderGameUI(dummyCharacter, dummyScore, isCorrect,conHandler, restartHandler);

})
