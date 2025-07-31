// we don't need this file look at the dom createBtn function
import { createHtmlElement } from '../utilities/dom.js';
export const createConButton = (onClickHandler) => {
  const btn = createHtmlElement('button', [
    'px-6',
    'py-2',
    'bg-primary',
    'text-white',
    'text-lg',
    'border-2',
    'rounded-2xl',
    'font-semibold',
    'rounded-button',
    'shadow',
    'hover:bg-blue-500',
    'transition-colors',
    'duration-300',
    'continue',
  ]);
  btn.textContent = 'Continue';
  btn.addEventListener('click', onClickHandler);
  return btn;
};
