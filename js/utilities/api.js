import { fetch } from "./fetch.js";

const getRandom=(array, number)=> {
  const result = [];
  while (result.length < number && result.length < array.length) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const item = array[randomIndex];
    if (!result.includes(item)) {
      result.push(item);
    }
  }
  return result;
}
let animeData = null;

export const fetchAnime=()=> {
    const url ='https://api.jikan.moe/v4/characters'
    fetch(url, "GET", (err, data) => {
        if (err) {
      console.error("Error fetching anime data:", err);
      return;
        }
  
        animeData= getRandom(data.data, 10);
        const character = animeData[0];
        const readMoreBtn = document.querySelector(".readMoreBtn");
        const desc = document.querySelector(".descAnime");

        if (desc && character) {
          let cleanDescription =
            animeData[0].about || "No description available.";
          cleanDescription = cleanDescription.split(character.name).join("");
          desc.textContent = cleanDescription;

          if (character.about && character.about.length > 300) {
            readMoreBtn.style.display = "inline";
          } else {
            readMoreBtn.style.display = "none";
          }
        }
        console.log(animeData);
      })
    }





