
import { createCharacterCard } from "../components/cards.js";
import { createResultSection } from "../components/result.js"; // إذا عندك دالة لنتيجة اللعبة
import { createRestartButton } from "../components/buttons.js";
import { createElement ,elementsAppender} from "./header.js";
export function renderGameUI(character, score, isCorrect, restartHandler) {
  const container = document.querySelector(".container");

  const card = createCharacterCard(character);
  const result = createResultSection(score, isCorrect);
  const restartBtn = createRestartButton(restartHandler);

  const controlsDiv = createElement("div", ["flex", "items-center", "mt-4"]);
  controlsDiv.appendChild(restartBtn);


  elementsAppender(container, [card, result, controlsDiv]);
}
