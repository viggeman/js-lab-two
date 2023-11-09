const characterCard = document.querySelector(".info-listing");
const characterDetails = document.querySelector(".presentation");

/* API Call */

async function fetchPeople(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

htmlMachine = (chars) => {
  let peopleCount = 0;
  chars.forEach((char) => {
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
};

async function personCards() {
  characterCard.innerHTML = `<div class="loader"></div>`;
  let url = "https://swapi.dev/api/people";
  let getCharacters = await fetchPeople(url);
  if (getCharacters) {
    characterCard.removeChild(characterCard.firstElementChild);
    let nextUrl = getCharacters.next;
    let characters = getCharacters.results;
    let allCharacters = getCharacters.results;
    let peopleCount = 0;
    while (nextUrl !== null) {
      characters.forEach((char) => {
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
      characters = getCharacters.results;
      nextUrl = getCharacters.next;
    }
    sessionStorage.setItem("characters", JSON.stringify(allCharacters));
  }
}

createPersonCards = () => {
  const allCharacters = JSON.parse(sessionStorage.getItem("characters"));

  htmlMachine(allCharacters);
};

if (!("characters" in sessionStorage)) {
  personCards();
} else {
  createPersonCards();
}
