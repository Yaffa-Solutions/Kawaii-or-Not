import { createElement ,elementsAppender} from "./header.js";
// import {createResultSection} from "./result.js"
export const createCharacterCard =(character)=> {
// const cardWrapper = createElement("div",[
//     "flex", "flex-col",
//     "md:flex-row", "justify-center","items-center",
//      " gap-8","mt-8", "character-card",
// ]);//
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
  img.src = `https://readdy.ai/api/search-image?query=${encodeURIComponent(character.name)}%20anime%20character&width=300&height=400`;
  //"https://readdy.ai/api/search-image?query=Naruto%20Uzumaki%20anime%20character%20with%20spiky%20blonde%20hair%20wearing%20orange%20ninja%20outfit%2C%20bright%20anime%20art%20style%2C%20clean%20white%20background%2C%20front%20facing%20portrait&width=300&height=400&seq=naruto1&orientation=portrait";
  img.alt = character.name;

  const name = createElement("p", ["font-semibold", "text-lg"]);
  name.textContent = character.name;
  
  elementsAppender(card, [img, name]);
//   elementsAppender(cardWrapper,[card ,createResultSection()])
  return card;
}
