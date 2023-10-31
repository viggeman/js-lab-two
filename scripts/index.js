const searchParams = new URLSearchParams(window.location.search);
const characterIndex = Number(searchParams.get("id")) - 1;
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

function displayCharacterDetails(id) {
  const character = JSON.parse(localStorage.getItem("characters"));

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
}

async function personCards() {
  characterCard.innerHTML = `<div class="loader"></div>`;
  let url = "https://swapi.dev/api/people";
  let response = await fetchPeople(url);
  if (response) {
    characterCard.removeChild(characterCard.firstElementChild);
    let nextUrl = response.next;
    let people = response.results;
    let peopleCount = 0;
    let allPeople = response.results;
    while (nextUrl !== null) {
      response = await fetchPeople(nextUrl);
      people.forEach((person) => {
        peopleCount++;
        const card = document.createElement("div");
        card.classList.add("info-card");
        card.innerHTML = `
        <a href="../pages/character.html?id=${peopleCount}">
        <img src="../media/people/${peopleCount}.jpg" alt="${person.name}" />
        <div class="info-card-text">
        <p>Name: ${person.name}</p>
        <p>Birth Year: ${person.birth_year}</p>
        </div>
        </a>
        `;
        characterCard.appendChild(card);
      });
      allPeople = allPeople.concat(response.results);
      people = response.results;
      nextUrl = response.next;
    }
    localStorage.setItem("characters", JSON.stringify(allPeople));
    console.log("local", localStorage.getItem("characters"));
  }
}

function createPersonCards() {
  const allCharacters = JSON.parse(localStorage.getItem("characters"));
  // console.log(allCharacters);
  let peopleCount = 0;

  allCharacters.forEach((character) => {
    peopleCount++;
    // console.log(character);
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
}

if (!("characters" in localStorage)) {
  window.onload = async () => {
    personCards();
    console.log("onload");
  };
  // const allPeople = await fetchAllPeople();
} else {
  createPersonCards(characterIndex);
}

if (characterIndex >= 0 && "characters" in localStorage) {
  displayCharacterDetails(characterIndex);
}
