import { createHtmlElement, customAppendChild } from '../../utilities/dom.js';
import { goHundler } from '../../utilities/api.js';

export const createDescription = (parent) => {
  const descDiv = createHtmlElement('div', [
    'max-w-2xl',
    'mx-auto',
    'text-center',
    'mt-2',
  ]);

  const pDiv = createHtmlElement('div', [
    'bg-gray-100',
    'rounded-xl',
    'p-6',
    'text-lg',
    'text-gray-700',
    'shadow',
    'relative',
  ]);

  const descP = createHtmlElement('p', [
    'italic',
    'descAnime',
    'line-clamp-3',
    'transition-all',
    'duration-300',
    'text-ellipsis',
    'overflow-hidden',
  ]);

  const readMoreBtn = createHtmlElement(
    'button',
    [
      'mt-2',
      'text-blue-500',
      'hover:underline',
      'font-medium',
      'text-sm',
      'readMoreBtn',
    ],
    'Read more',
    {
      click: () => {
        descP.classList.toggle('line-clamp-3');
        if (readMoreBtn.textContent === 'Read more') {
          readMoreBtn.textContent = 'Show less';
        } else {
          readMoreBtn.textContent = 'Read more';
        }
      },
    }
  );

  readMoreBtn.style.display = 'none';

  customAppendChild(descDiv, pDiv);
  customAppendChild(pDiv, descP, readMoreBtn);
  customAppendChild(parent, descDiv);
};

export const createSearch = (parent) => {
  const searchContainer = createHtmlElement('div', [
    'flex',
    'justify-center',
    'mb-4',
    'mt-4',
  ]);

  const searchDiv = createHtmlElement('div', [
    'w-full',
    'max-w-2xl',
    'flex',
    'gap-2',
  ]);

  const goButton = createHtmlElement(
    'button',
    [
      'h-16',
      'px-6',
      'bg-gray-400',
      'text-white',
      'rounded-2xl',
      'shadow-lg',
      'hover:bg-primary-dark',
      'transition-all',
      'duration-300',
      'text-lg',
      'font-semibold',
      'go',
    ],
    'Go',
    { click: goHundler }
  );

  const searchInput = createHtmlElement(
    'input',
    [
      'flex-grow',
      'w-full',
      'h-16',
      'pl-16',
      'pr-16',
      'text-lg',
      'border-2',
      'border-gray-200',
      'rounded-2xl',
      'bg-white',
      'shadow-lg',
      'focus:outline-none',
      'focus:border-primary',
      'focus:ring-4',
      'focus:ring-primary/20',
      'transition-all',
      'duration-300',
      'input',
    ],
    '',
    {
      input: (e) => {
        console.log('test', goButton);
        const isEmpty = searchInput.value.trim() === '';
        goButton.disabled = isEmpty;
        if (isEmpty) {
          goButton.classList.remove('bg-primary');
          goButton.classList.add('bg-gray-400');
        } else {
          goButton.classList.remove('bg-gray-400');
          goButton.classList.add('bg-primary');
        }
      },
    }
  );

  searchInput.type = 'text';
  searchInput.placeholder = 'Enter character name...';

  goButton.disabled = true;

  customAppendChild(searchDiv, searchInput, goButton);
  customAppendChild(searchContainer, searchDiv);
  customAppendChild(parent, searchContainer);
};
