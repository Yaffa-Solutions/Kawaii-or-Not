import { createElement } from "./header.js";
export function createRestartButton(onClickHandler) {
  const btn = createElement("button", [
    "bg-gray-300",
    "rounded",
    "px-4",
    "py-2",
    "ml-2",
  ]);
  btn.textContent = "Restart";
  btn.addEventListener("click", onClickHandler);
  return btn;
}
