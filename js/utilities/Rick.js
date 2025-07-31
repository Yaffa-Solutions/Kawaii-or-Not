// let isCurrentRick = false;

const getRandomChars = (arr, count) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
let score = 0;
let rickData = null;
let rickIndex = 0;
let continueBtn = null;


export const fetchRick = () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://rickandmortyapi.com/api/character");
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      const characters = getRandomChars(data.results, 10);

      
      const descriptionsPromises = characters.map(char => getDescriptionXHR(char.name));

      Promise.all(descriptionsPromises).then(descriptions => {
        console.log('Descriptions:', descriptions);
        rickData = characters.map((char, index) => ({
          name: char.name,
          image: char.image,
          desc: descriptions[index],
        }));
  
        rickIndex = 0;
        updateCard(rickData[rickIndex],false);
        updateDescription(rickData[rickIndex]);

         continueBtn = document.querySelector(".continue");
        if (continueBtn) {
          continueBtn.disabled = true;
          continueBtn.classList.add("opacity-50", "cursor-not-allowed");
          continueBtn.addEventListener("click", clickContinue);
        }
        
        const input = document.querySelector(".input");
        if (input) {
          input.disabled = false;
          input.value = "";
        }

        updateResultMessage("Your guess?");
      });
    }
  };
  xhr.send();
};

const key = 'AIzaSyAL3X_XMxZ0qy-Fpe7OmSzBUgwFk_hb4fY';
const key2='AIzaSyAq9wAGrqvxtgB4fhQqB5UqDWNqi1dei3M'

const getDescriptionXHR = (name) => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    const fKey='AIzaSyC9h53oKcxtBO8uv9nhIq8kdFpkhb0Wzmc'
    xhr.open("POST", `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyC5sQfvKenfDrDMvOr7eoD6Rwp9-Q8hnLY`);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {

      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          const desc = data.candidates?.[0]?.content?.parts?.[0]?.text || "loading";
          resolve(desc);
        } else {
          resolve("loading");
        }
      }
    };

    const body = JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: `Write a short description (1-2 lines) about a fictional character named "${name}" from the show Rick and Morty, without mentioning the name in the description.`,
            },
          ],
        },
      ],
    });

    xhr.send(body);
});
};

const updateCard = (character ,showInfo) => {
  const img = document.querySelector(".card-image");
  const name = document.querySelector(".card-name");

  if (!img || !name) return;

  img.src = character.image;
  img.alt = character.name;
  name.textContent = character.name;

  img.style.display = showInfo ? "block" : "none";
  name.style.display = showInfo ? "block" : "none";
};

const updateDescription = (character) => {
  const desc = document.querySelector(".descAnime");

  if (desc && character) {
    desc.textContent = character.desc || "loading";
  }
};

const updateResultMessage = (text) => {
  const msg = document.querySelector(".msg");
  if (!msg) return;
  msg.textContent = text;
  msg.classList.remove("text-green-500", "text-red-500");

  if (text.includes("right")) {
    msg.classList.add("text-green-500");
  } else if (text.includes("wrong")) {
    msg.classList.add("text-red-500");
  } else {
    msg.classList.remove("text-green-500", "text-red-500");
  }
};
const clickContinue = () => {
  if (!rickData) return;
  rickIndex++;
  if (rickIndex >= rickData.length) {
  
    const finalMessage =
      score > 5
        ? `Your final score is: ${score}/10 🎉 You did great!`
        : `Your final score is: ${score}/10 😅 This game might not be your thing!`;
    updateResultMessage(finalMessage);

    const goBtn = document.querySelector(".go");
    const input = document.querySelector(".input");

    if (goBtn) {
      goBtn.disabled = true;
      goBtn.classList.add("opacity-50", "cursor-not-allowed");
    }
    if (input) input.disabled = true;

    return;
  }

  updateCard(rickData[rickIndex], false);
  updateDescription(rickData[rickIndex]);

  const input = document.querySelector(".input");
  if (input) {
    input.disabled = false;
    input.value = "";
  }

  continueBtn.disabled = true;
  continueBtn.classList.add("opacity-50", "cursor-not-allowed");

  updateResultMessage("Your guess?");
};
const updateScoreDisplay = (newScore) => {
  const scoreEl = document.querySelector(".score");
  if (!scoreEl) return;

  const isFinal = rickIndex === rickData.length - 1;
  if (isFinal) {
    const finalMessage =
      newScore > 5
        ? `Your final score is: ${newScore}/10 🎉 You did great!`
        : `Your final score is: ${newScore}/10 😅 This game might not be your thing!`;
    scoreEl.textContent = finalMessage;
  } else {
    scoreEl.textContent = `Your score is: ${newScore}/10`;
  }
};

export const goHandlerRick = () => {
  const input = document.querySelector(".input");
  const guess = input.value.trim().toLowerCase();
  const currentChar = rickData[rickIndex];
   const correctName = currentChar.name.split(" ")[0].toLowerCase();


  if (guess === correctName) {
    score++;
    updateResultMessage("You got it right! 🎉");
  } else {
    updateResultMessage("You got it wrong :(");
  }
  updateScoreDisplay(score);
  input.value = "";

  updateCard(currentChar, true);
  input.disabled = true;

   const goBtn = document.querySelector(".go");
  if (goBtn) {
    goBtn.disabled = true;
    goBtn.classList.add("opacity-50", "cursor-not-allowed");
  }

  const isFinal = rickIndex === rickData.length - 1;
  if (isFinal) {
    if (continueBtn) {
      continueBtn.disabled = true;
      continueBtn.classList.add("opacity-50", "cursor-not-allowed");
    }

    return;
  }

  if (continueBtn) {
    continueBtn.disabled = false;
    continueBtn.classList.remove("opacity-50", "cursor-not-allowed");
  }
};

// export const stopRick = () => {
//   isCurrentRick = false;
// };
