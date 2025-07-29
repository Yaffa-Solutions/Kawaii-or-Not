import { createHeaderSection } from "../components/header.js"
import {renderGameUI} from "../components/render.js"

document.addEventListener('DOMContentLoaded',()=>{
    createHeaderSection()
    const dummyCharacter = { name: "Naruto Uzumaki", img: "https://via.placeholder.com/150" };
  const dummyScore = 5;
  const isCorrect = true;
  
  function restartHandler() {
    console.log("Restart clicked");
    
  }

  renderGameUI(dummyCharacter, dummyScore, isCorrect, restartHandler);
})