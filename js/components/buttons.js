// we don't need this file

import { createHtmlElement } from '../utilities/dom.js';
import { restartBtn } from '../utilities/api.js';
export const createRestartButton = (onClickHandler) => {
  const createRestartButton = createHtmlElement(
    'button',
    [
      'px-6',
      'py-2',
      'bg-gray-200',
      'text-gray-800',
      'text-lg',
      'border-2',
      'rounded-2xl',
      'font-semibold',
      'rounded-button',
      'shadow',
      'hover:bg-gray-300',
      'transition-colors',
      'duration-300',
      'restart',
    ],
    'Restart',
    {
      click: onClickHandler,
      click: restartBtn,
      // click: () => {
      //   restartBtn();
      // },
    }
  );

  return btn;
};

// const test = {
//   test: '11',
//   test: 'ddadf',
// };

// console.log('test', test);
