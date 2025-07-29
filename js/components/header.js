import { fetchAnime } from "../utilities/api.js";
export function createElement(tag, classes = []) {
  const el = document.createElement(tag);
  classes.forEach((cl) => el.classList.add(cl));
  return el;
}

export const elementsAppender = (parent, children) => {
  children.forEach((child) => parent.appendChild(child));
};

export let currentChoice = "Anime";

const getContainer = () => {
  return document.querySelector(".container");
};

export const createHeaderSection = () => {
  const container = getContainer();
  const mainDiv = createElement("div", [
    "mx-auto",
    "px-4",
    "py-8",
    "max-w-6xl",
  ]);
  const header = createElement("header", ["text-center", "mb-12"]);
  const bigTitle = createElement("h1", [
    "text-5xl",
    "font-bold",
    "text-gray-800",
    "mb-4",
  ]);
  bigTitle.textContent = "Character Guess Game";
  const p = createElement("p", ["text-xl", "text-gray-600"]);
  p.textContent = "Think You Know Anime And Rick & Morty ?";
  elementsAppender(header, [bigTitle, p]);
  elementsAppender(mainDiv, [header]);

  const switcherDiv = createElement("div", [
    "flex",
    "justify-center",
    "mb-4",
    "-mt-8",
  ]);
  const typeSwitcherDiv = createElement("div", [
    "type-switcher",
    "w-80",
    "h-16",
    "flex",
  ]);
  const switcherBgDiv = createElement("div", ["switcher-bg"]);
  const animeBtn = createElement("button", [
    "type-option",
    "flex-1",
    "flex",
    "items-center",
    "justify-center",
    "gap-3",
    "font-bold",
    "text-lg",
    "active",
  ]);
  animeBtn.textContent = "Anime";
  const rickAndMortyBtn = createElement("button", [
    "type-option",
    "flex-1",
    "flex",
    "items-center",
    "justify-center",
    "gap-3",
    "font-bold",
    "text-lg",
    "text-gray-600",
  ]);
  rickAndMortyBtn.textContent = " Rick & Morty";
  elementsAppender(typeSwitcherDiv, [switcherBgDiv, animeBtn, rickAndMortyBtn]);
  elementsAppender(switcherDiv, [typeSwitcherDiv]);
  elementsAppender(mainDiv, [switcherDiv]);

  animeBtn.addEventListener("click", () => {
    animeBtn.classList.add("active");
    animeBtn.classList.remove("text-gray-600");
    rickAndMortyBtn.classList.remove("active");
    rickAndMortyBtn.classList.add("text-gray-600");
    switcherBgDiv.classList.remove("rickandmorty");
    currentChoice = "Anime";
    fetchAnime();
  });

  rickAndMortyBtn.addEventListener("click", () => {
    rickAndMortyBtn.classList.add("active");
    rickAndMortyBtn.classList.remove("text-gray-600");
    animeBtn.classList.remove("active");
    animeBtn.classList.add("text-gray-600");
    switcherBgDiv.classList.add("rickandmorty");
    currentChoice = "RickAndMorty";
  });

  createDescription(mainDiv);
  createSearch(mainDiv);
  elementsAppender(container, [mainDiv]);
  fetchAnime();
};

const createDescription = (parent) => {
  const descDiv = createElement("div", [
    "max-w-2xl",
    "mx-auto",
    "text-center",
    "mt-2",
  ]);
  const pDiv = createElement("div", [
    "bg-gray-100",
    "rounded-xl",
    "p-6",
    "text-lg",
    "text-gray-700",
    "shadow",
    "relative",
  ]);
  const descP = createElement("p", [
    "italic",
    "desc",
    "line-clamp-3",
    "transition-all",
    "duration-300",
    "text-ellipsis",
    "overflow-hidden",
  ]);
  const readMoreBtn = createElement("button", [
    "mt-2",
    "text-blue-500",
    "hover:underline",
    "font-medium",
    "text-sm",
    "readMoreBtn"
  ]);
  readMoreBtn.textContent = "Read more";
  readMoreBtn.style.display = "none"; 
  
  readMoreBtn.addEventListener("click", () => {
    descP.classList.toggle("line-clamp-3");
    if (readMoreBtn.textContent === "Read more") {
      readMoreBtn.textContent = "Show less";
    } else {
      readMoreBtn.textContent = "Read more";
    }
  });
  elementsAppender(descDiv, [pDiv]);
  elementsAppender(pDiv, [descP,readMoreBtn]);
  elementsAppender(parent, [descDiv]);
};

const createSearch = (parent) => {
  const searchContainer = createElement("div", [
    "flex",
    "justify-center",
    "mb-4",
    "mt-4",
  ]);
  const searchDiv = createElement("div", ["w-full", "max-w-2xl"]);
  const searchInput = createElement("input", [
    "w-full",
    "h-16",
    "pl-16",
    "pr-16",
    "text-lg",
    "border-2",
    "border-gray-200",
    "rounded-2xl",
    "bg-white",
    "shadow-lg",
    "focus:outline-none",
    "focus:border-primary",
    "focus:ring-4",
    "focus:ring-primary/20",
    "transition-all",
    "duration-300",
  ]);
  searchInput.type = "text";
  searchInput.placeholder = "Enter character name...";
  elementsAppender(searchDiv, [searchInput]);
  elementsAppender(searchContainer, [searchDiv]);
  elementsAppender(parent, [searchContainer]);
};
