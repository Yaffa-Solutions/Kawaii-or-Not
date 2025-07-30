import { createCharacterCard } from "../components/cards.js";
import { createResultSection } from "../components/result.js";
import { createConButton } from "../components/continueBtn.js";
import { createRestartButton } from "../components/buttons.js";
import { createElement, elementsAppender } from "./header.js";
export const renderGameUI = (
  character,
  score,
  isCorrect,
  conHandler,
  restartHandler
) => {
  const container = document.querySelector(".container");

  const card = createCharacterCard(character);
  const result = createResultSection(score, isCorrect);
  const conBtn = conHandler ? createConButton(conHandler) : null;
  const restartBtn = createRestartButton(restartHandler);

  const controlsDiv = createElement("div", [
    "flex",
    "items-center",
    "justify-center",
    "gap-4",
    "mt-4",
  ]);
  if (conBtn) elementsAppender(controlsDiv, [conBtn]);
  elementsAppender(controlsDiv, [restartBtn]);
  const wrapper = createElement("div", [
    "flex",
    "flex-col",
    "md:flex-row",
    "items-center",
    "justify-center",
    "gap-8",
    "mt-8",
    "card-div",
  ]);
  elementsAppender(wrapper, [card, result]);

  elementsAppender(container, [wrapper, controlsDiv]);
};
