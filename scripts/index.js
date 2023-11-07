const searchParams = new URLSearchParams(window.location.search);
const characterIndex = Number(searchParams.get("id")) - 1;
console.log(characterIndex);
const characterCard = document.querySelector(".info-listing");
const characterDetails = document.querySelector(".presentation");

async function fetchPeople(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function personCards() {
  characterCard.innerHTML = `<div class="loader"></div>`;
  let url = "https://swapi.dev/api/people";
  let getCharacters = await fetchPeople(url);
  if (getCharacters) {
    characterCard.removeChild(characterCard.firstElementChild);
    let nextUrl = getCharacters.next;
    let charachters = getCharacters.results;
    let peopleCount = 0;
    let allCharacters = getCharacters.results;
    while (nextUrl !== null) {
      charachters.forEach((char) => {
        peopleCount++;
        const card = document.createElement("div");
        card.classList.add("info-card");
        card.innerHTML = `
        <a href="../pages/character.html?id=${peopleCount}">
        <img src="../media/people/${peopleCount}.jpg" alt="${char.name}" />
        <div class="info-card-text">
        <p>Name: ${char.name}</p>
        <p>Birth Year: ${char.birth_year}</p>
        </div>
        </a>
        `;
        characterCard.appendChild(card);
      });
      getCharacters = await fetchPeople(nextUrl);
      allCharacters = allCharacters.concat(getCharacters.results);
      charachters = getCharacters.results;
      nextUrl = getCharacters.next;
    }
    localStorage.setItem("characters", JSON.stringify(allCharacters));
    console.log("local", localStorage.getItem("characters"));
  }
}

createPersonCards = () => {
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
};

if (!("characters" in localStorage)) {
  personCards();
} else {
  createPersonCards(characterIndex);
}
