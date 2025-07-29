import { createElement ,elementsAppender} from "./header.js";
export const createCharacterCard =(character)=> {
  const card = createElement("div", [
    "bg-white",
    "rounded-xl",
    "shadow",
    "p-4",
    "max-w-xs",
    "text-center",
    "w-72",
  ]);

  const img = createElement("img", [
    "mx-auto",
     "rounded-lg",
      "mb-4",
      "w-48",
      "h-60",
      "object-cover",
    ]);
  img.src = character.img;
  img.alt = character.name;

  const name = createElement("p", ["font-semibold", "text-lg"]);
  name.textContent = character.name;
  
  elementsAppender(card, [img, name]);

  return card;
}
