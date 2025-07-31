import { fetchAnime } from '../utilities/api.js';
import {
  createDescription,
  createSearch,
} from '../components/animeBtn/index.js';

import {
  createHtmlElement,
  customAppendChild,
  queryHtmlElement,
  createSwitcherButton,
  handleSwitcherClick,
} from '../utilities/dom.js';

export let currentChoice = 'Anime';

export const createHeaderSection = () => {
  const container = queryHtmlElement('.container');

  const mainDiv = createHtmlElement('div', [
    'mx-auto',
    'px-4',
    'py-8',
    'max-w-6xl',
  ]);

  const header = createHtmlElement('header', ['text-center', 'mb-12']);

  const bigTitle = createHtmlElement(
    'h1',
    ['text-5xl', 'font-bold', 'text-gray-800', 'mb-4'],
    'Character Guess Game'
  );

  const p = createHtmlElement(
    'p',
    ['text-xl', 'text-gray-600'],
    'Think You Know Anime And Rick & Morty ?'
  );

  customAppendChild(header, bigTitle, p);
  customAppendChild(mainDiv, header);

  const switcherDiv = createHtmlElement('div', [
    'flex',
    'justify-center',
    'mb-4',
    '-mt-8',
  ]);

  const typeSwitcherDiv = createHtmlElement('div', [
    'type-switcher',
    'w-80',
    'h-16',
    'flex',
  ]);

  const switcherBgDiv = createHtmlElement('div', ['switcher-bg']);

  const animeBtn = createSwitcherButton('Anime', true, () => {
    handleSwitcherClick({
      activeBtn: animeBtn,
      inactiveBtn: rickAndMortyBtn,
      isAnime: true,
      switcherBgDiv,
      fetchData: fetchAnime,
    });
    currentChoice = 'Anime';
  });

  const rickAndMortyBtn = createSwitcherButton('Rick & Morty', false, () => {
    handleSwitcherClick({
      activeBtn: rickAndMortyBtn,
      inactiveBtn: animeBtn,
      isAnime: false,
      switcherBgDiv,
      fetchData: () => {
        console.log('Hello');
      },
    });
    currentChoice = 'RickAndMorty';
  });

  customAppendChild(typeSwitcherDiv, switcherBgDiv, animeBtn, rickAndMortyBtn);
  customAppendChild(switcherDiv, typeSwitcherDiv);
  customAppendChild(mainDiv, switcherDiv);

  createDescription(mainDiv);
  createSearch(mainDiv);
  customAppendChild(container, mainDiv);
  fetchAnime();
};
