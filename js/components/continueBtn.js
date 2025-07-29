import { createElement } from "./header.js";
export const createConButton = (onClickHandler)=> {
  const btn = createElement("button", [
    "px-6", "py-2", "bg-primary", "text-white", "text-lg",
  "border-2", "rounded-2xl", "font-semibold","rounded-button", "shadow",
  "hover:bg-blue-500", "transition-colors", "duration-300",
  ]);
  btn.textContent = "Continue";
  btn.addEventListener("click", onClickHandler);
  return btn;
}