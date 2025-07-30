// let isCurrentRick = false;

const getRandomChars = (arr, count) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

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
    //       const descriptions = await getDescriptionsSequentially(characters);

    //   rickData = characters.map((char, index) => ({
    //     name: char.name,
    //     image: char.image,
    //     desc: descriptions[index] || "No description available",
    //   }));

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
    xhr.open("POST", `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyC9h53oKcxtBO8uv9nhIq8kdFpkhb0Wzmc`);
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
  if (msg) msg.textContent = text;
};

const clickContinue = () => {
  if (!rickData) return;
  rickIndex++;
  if (rickIndex >= rickData.length) rickIndex = 0;
  updateCard(rickData[rickIndex],false);
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

export const goHandlerRick = () => {
  const input = document.querySelector(".input");
  const guess = input.value.trim().toLowerCase();
  const currentChar = rickData[rickIndex];
  const correctName = currentChar.name.toLowerCase();

  if (guess === correctName) {
    updateResultMessage("Correct!");
  } else {
    updateResultMessage("Wrong!");
  }

  updateCard(currentChar, true);
  input.disabled = true;

  if (continueBtn) {
    continueBtn.disabled = false;
    continueBtn.classList.remove("opacity-50", "cursor-not-allowed");
  }
};

// export const stopRick = () => {
//   isCurrentRick = false;
// };
