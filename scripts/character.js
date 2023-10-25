const searchParams = new URLSearchParams(window.location.search);
const characterIndex = Number(searchParams.get("id")) - 1;

console.log(characterIndex);

async function fetchCharacter(charId) {
  let url = "https://swapi.dev/api/people/";
  if (charId) {
    url = `https://swapi.dev/api/people/${charId}`;
    console.log(url);
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  } else {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}

function displayCharacterDetails(id) {
  const character = JSON.parse(localStorage.getItem("characters"));
  console.log(character[id]);
  const characterDetails = document.querySelector(".character-details");
  const characterImage = document.querySelector(".character-image");

  if (character) {
    const imageIndex = id + 1;
    characterImage.innerHTML = `<img src="../media/people/${imageIndex}.jpg" alt="${character[id].name}" />`;

    characterDetails.innerHTML = `
          <h2>${character[id].name}</h2>
          <p>Birth Year: ${character[id].birth_year}</p>
          <p>Height: ${character[id].height}</p>
          <p>Mass: ${character[id].mass}</p>
          <!-- Add more details here -->
      `;
  } else {
    characterDetails.innerHTML = "<p>Character not found.</p>";
  }
}

function createPersonCards() {
  const allCharacters = JSON.parse(localStorage.getItem("characters"));
  const characterCard = document.querySelector(".info-listing");
  console.log(allCharacters);
  let peopleCount = 0;

  allCharacters.forEach((character) => {
    peopleCount++;
    console.log(character);
    const card = document.createElement("div");
    card.classList.add("info-card");
    card.innerHTML = `
        <a href="../pages/charachter.html?id=${peopleCount}">
        <img src="../media/people/${peopleCount}.jpg" alt="${character.name}" />
        <div class="info-card-text">
        <p>Name: ${character.name}</p>
        <p>Birth Year: ${character.birth_year}</p>
        </div>
        </a>
      `;
    characterCard.appendChild(card);
  });
}

// const storedChar = JSON.parse(localStorage.getItem("character"));

// console.log(storedChar);

// console.log(JSON.parse(localStorage.getItem("character")));

// displayCharacterDetails(characterIndex);
if (characterIndex >= 0) {
  displayCharacterDetails(characterIndex);
}
createPersonCards();
