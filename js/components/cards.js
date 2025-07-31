import { createHtmlElement, customAppendChild } from '../utilities/dom.js';

export const createCharacterCard = () => {
  const card = createHtmlElement('div', [
    'bg-white',
    'rounded-xl',
    'shadow',
    'p-4',
    'max-w-xs',
    'text-center',
    'w-72',
  ]);

  const img = createHtmlElement('img', [
    'mx-auto',
    'rounded-lg',
    'mb-4',
    'w-48',
    'h-60',
    'object-cover',
    'card-image',
  ]);

  const name = createHtmlElement('p', [
    'font-semibold',
    'text-lg',
    'card-name',
  ]);

  customAppendChild(card, img, name);
  return card;
};
