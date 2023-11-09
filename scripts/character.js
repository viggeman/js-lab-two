const searchParams = new URLSearchParams(window.location.search);
const characterIndex = Number(searchParams.get("id")) - 1;
console.log(characterIndex);
const characterCard = document.querySelector(".info-listing");
const characterDetails = document.querySelector(".presentation");

// ADD TO FUNCTIONS ABOVE

async function fetchPeople(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

displayCharacterDetails = (id) => {
  const character = JSON.parse(sessionStorage.getItem("characters"));

  if (character) {
    const imageIndex = id + 1;

    characterDetails.innerHTML = `
    <div class="character-image two-col">
      <img src="../media/people/${imageIndex}.jpg" alt="${character[id].name}" />
    </div>
    <div class="character-details two-col">
      <div class="character-text">
        <h2>${character[id].name}</h2>
        <p>Birth Year: ${character[id].birth_year}</p>
        <p>Height: ${character[id].height} cm</p>
        <p>Mass: ${character[id].mass} kg</p>
        <p>Hair Color: ${character[id].hair_color}</p>
        <p>Eye Color: ${character[id].eye_color}</p>
        <p>Gender: ${character[id].gender}</p>
      </div>
    </div>
    `;
  } else {
    characterDetails.innerHTML = "<p>Character not found.</p>";
  }
};

createPersonCards = () => {
  const allCharacters = JSON.parse(sessionStorage.getItem("characters"));
  let peopleCount = 0;

  allCharacters.forEach((character) => {
    peopleCount++;
    const card = document.createElement("div");
    card.classList.add("info-card");

    card.innerHTML = `
        <a href="../pages/character.html?id=${peopleCount}">
        <img src="../media/people/${peopleCount}.jpg" alt="${character.name}" />
        <div class="info-card-text">
        <p>Name: ${character.name}</p>
        <p>Birth Year: ${character.birth_year}</p>
        </div>
        </a>
      `;

    characterCard.appendChild(card);
  });
};

createPersonCards(characterIndex);

if (characterIndex >= 0 && "characters" in sessionStorage) {
  displayCharacterDetails(characterIndex);
}
