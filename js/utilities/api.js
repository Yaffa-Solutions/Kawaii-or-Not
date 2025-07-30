import { fetch } from "./fetch.js";
import { renderGameUI } from "../components/render.js";
const getRandom = (array, number) => {
  const result = [];
  while (result.length < number && result.length < array.length) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const item = array[randomIndex];
    if (!result.includes(item)) {
      result.push(item);
    }
  }
  return result;
};
const restartHandler = () => {
  score = 0;
  currentIndex = 0;
  fetchAnime();
};

let animeData = null;
let currentIndex = 0;
let score = 0;

export const fetchAnime = () => {
  const url = "https://api.jikan.moe/v4/characters";
  fetch(url, "GET", (err, data) => {
    if (err) {
      console.error("Error fetching anime data:", err);
      return;
    }

    animeData = getRandom(data.data, 10);
    currentIndex = 0;

    updateCard(animeData[currentIndex]);
    updateDescription(animeData[currentIndex]);
    checkInput(animeData[currentIndex]);

    const continueBtn = document.querySelector(".continue");
    if (continueBtn) {
      continueBtn.addEventListener("click", clickContinue);
    }
  });
};

const updateCard = (character) => {
  const img = document.querySelector(".card-image");
  const name = document.querySelector(".card-name");
  if (img && name) {
    img.src = character.images.jpg.image_url;
    img.alt = character.name;
    name.textContent = character.name;
  }
};

const updateDescription = (character) => {
  const desc = document.querySelector(".descAnime");
  const readMoreBtn = document.querySelector(".readMoreBtn");

  if (desc && character) {
    let cleanDescription = character.about || "No description available.";
    cleanDescription = cleanDescription.split(character.name).join("");
    desc.textContent = cleanDescription;

    if (character.about && character.about.length > 300) {
      readMoreBtn.style.display = "inline";
    } else {
      readMoreBtn.style.display = "none";
    }
  }
};

const clickContinue = () => {
  if (!animeData) return;
  currentIndex++;
  if (currentIndex >= animeData.length) {
    const finalCharacter = animeData[currentIndex - 1];
    renderGameUI(finalCharacter, score, true, null, restartGame);

    return;
  }
  updateCard(animeData[currentIndex]);
  updateDescription(animeData[currentIndex]);
  checkInput(animeData[currentIndex]);
};

const checkInput = (character) => {
  const input = document.querySelector(".guess-input");
  const divCard = document.querySelector(".card-div");

  input.value = "";
  input.focus();
  input.addEventListener("keypress", function handler(e) {
    if (e.key === "Enter") {
      const guessValue = input.value.trim().toLowerCase();
      const charName = character.name.trim().toLowerCase();
      updateCard(animeData[currentIndex]);

      if (guessValue === charName) {
        score++;
        renderGameUI(character, score, true, clickContinue, restartHandler);
      } else {
        renderGameUI(character, score, false, clickContinue, restartHandler);
      }
      if (divCard) {
        divCard.style.display = "block";
      }
      input.removeEventListener("keypress", handler);
    }
  });
};
