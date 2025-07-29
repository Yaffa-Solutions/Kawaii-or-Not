function getRandom(array, number) {
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

export function fetchAnime() {
  let xhr = new XMLHttpRequest();
  let url = "https://api.jikan.moe/v4/characters";

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        const randomChar = getRandom(data.data, 10);
        const character = randomChar[0];
        const readMoreBtn = document.querySelector(".readMoreBtn");
        const desc = document.querySelector(".desc");

        if (desc && character) {
          let cleanDescription =
            randomChar[0].about || "No description available.";
          cleanDescription = cleanDescription.split(character.name).join("");
          desc.textContent = cleanDescription;

          if (character.about && character.about.length > 300) {
            readMoreBtn.style.display = "inline";
          } else {
            readMoreBtn.style.display = "none";
          }
        }
        console.log(randomChar);
      } else {
        console.error("Error fetching anime data");
      }
    }
  };

  xhr.open("GET", url);
  xhr.send();
}
