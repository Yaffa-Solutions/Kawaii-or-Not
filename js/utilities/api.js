import { fetch } from "./fetch.js";

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

let animeData = null;
let currentIndex = 0;
let score = 0;
let continueBtn = null;

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

     continueBtn = document.querySelector(".continue");
    continueBtn.disabled = true;
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

    img.style.display = "none";
    name.style.display = "none";
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
    continueBtn.disabled = true;
  continueBtn.classList.add("opacity-50", "cursor-not-allowed");
  

  currentIndex++;
  if (currentIndex >= animeData.length) currentIndex = 0;
  updateCard(animeData[currentIndex]);
  updateDescription(animeData[currentIndex]);
  const input = document.querySelector(".input");
if (input) {
  input.disabled = false;
  input.value = "";
}
  updateResultMessage("Your guess?");


};
const checkName = () => {
  const input = document.querySelector(".input");
  const guess = input.value.trim().toLowerCase();
  const currentChar = animeData[currentIndex];
  const correctName = currentChar.name.toLowerCase();

  if (guess === correctName) {
    score++;
    updateResultMessage("You got it right! 🎉");
  } else {
    updateResultMessage("You got it wrong :(");
  }
  updateScoreDisplay(score);
  input.value = "";
};
export const goHundler = () => {
  const img = document.querySelector(".card-image");
  const name = document.querySelector(".card-name");
  const input = document.querySelector(".input");


  const currentChar = animeData[currentIndex];

  updateDescription(currentChar);
  if (img && name) {
    img.style.display = "block";
    name.style.display = "block";
  }

  checkName();
  input.disabled = true;


  if (continueBtn) {
  continueBtn.disabled = false;
    continueBtn.classList.remove("opacity-50", "cursor-not-allowed");

};
}
const updateResultMessage = (text) => {
  const msg = document.querySelector(".msg");
  msg.textContent = text;
};
const updateScoreDisplay = (newScore) => {
  const score= document.querySelector(".score")
  if (!score) return;
  score.textContent = `Your score is: ${newScore}/10`;
};
export const restartBtn=()=>{
  score=0
  currentIndex=0
  updateResultMessage('Your Guess?')
  updateScoreDisplay(score)
  fetchAnime()
  const input = document.querySelector(".input");
  if (input) input.value = "";
  if (continueBtn) {
    continueBtn.disabled = true;
    continueBtn.classList.add("opacity-50", "cursor-not-allowed");
  }
}
