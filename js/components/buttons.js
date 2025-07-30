import { createElement } from "./header.js";
import { restartBtn } from "../utilities/api.js";
export const createRestartButton =(onClickHandler) =>{
  const btn = createElement("button", [
    "px-6", "py-2", "bg-gray-200", "text-gray-800", "text-lg",
  "border-2", "rounded-2xl", "font-semibold", "rounded-button","shadow",
  "hover:bg-gray-300", "transition-colors", "duration-300","restart"
  ]);
  btn.textContent = "Restart";
  btn.addEventListener("click", onClickHandler);
  btn.addEventListener('click',()=>{
    restartBtn()
  })
  return btn;
}
