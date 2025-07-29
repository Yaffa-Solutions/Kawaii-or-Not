import { createElement ,elementsAppender} from "./header.js";
export function createCharacterCard(character) {
  const card = createElement("div", [
    "bg-white",
    "rounded-xl",
    "shadow",
    "p-4",
    "max-w-xs",
    "text-center",
  ]);

  const img = createElement("img", ["mx-auto", "rounded-lg", "mb-4"]);
  img.src = "https://readdy.ai/api/search-image?query=Naruto%20Uzumaki%20anime%20character%20with%20spiky%20blonde%20hair%20wearing%20orange%20ninja%20outfit%2C%20bright%20anime%20art%20style%2C%20clean%20white%20background%2C%20front%20facing%20portrait&width=300&height=400&seq=naruto1&orientation=portrait";
  img.alt = character.name;

  const name = createElement("p", ["font-semibold", "text-lg"]);
  name.textContent = character.name;

  elementsAppender(card, [img, name]);

  return card;
}
