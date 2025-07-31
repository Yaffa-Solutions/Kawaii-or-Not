import { createCharacterCard } from '../components/cards.js';
import { createResultSection } from '../components/result.js';
import { createConButton } from '../components/continueBtn.js';
import { createRestartButton } from '../components/buttons.js';
import { createHtmlElement, customAppendChild } from '../utilities/dom.js';
export const renderGameUI = (
  character,
  score,
  isCorrect,
  conHandler,
  restartHandler
) => {
  const container = document.querySelector('.container');

  const card = createCharacterCard(character);
  const result = createResultSection(score, isCorrect);
  const conBtn = createConButton(conHandler);
  const restartBtn = createRestartButton(restartHandler);

  const controlsDiv = createHtmlElement('div', [
    'flex',
    'items-center',
    'justify-center',
    'gap-4',
    'mt-4',
  ]);
  customAppendChild(controlsDiv, conBtn, restartBtn);
  const wrapper = createHtmlElement('div', [
    'flex',
    'flex-col',
    'md:flex-row',
    'items-center',
    'justify-center',
    'gap-8',
    'mt-8',
  ]);
  customAppendChild(wrapper, card, result);

  customAppendChild(container, wrapper, controlsDiv);
};
