import { createHtmlElement, customAppendChild } from '../utilities/dom.js';

export const createResultSection = (score, isCorrect) => {
  const resultDiv = createHtmlElement('div', [
    'bg-white',
    'rounded-xl',
    'shadow',
    'p-6',
    'max-w-xs',
    'text-center',
  ]);

  const msg = createHtmlElement('p', [
    'font-bold',
    'text-gray-600',
    'text-xl',
    'mb-2',
    'msg',
  ]);
  msg.textContent = 'Your Guess ?';

  const scoreP = createHtmlElement('p', ['font-semibold', 'score']);
  score = 0;
  scoreP.textContent = `Your score is: ${score}/10`;

  customAppendChild(resultDiv, msg, scoreP);

  return resultDiv;
};
