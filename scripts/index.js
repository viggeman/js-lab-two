const searchParams = new URLSearchParams(window.location.search);
const characterIndex = Number(searchParams.get("id")) - 1;

/* async function fetchCharacter(charId) {
  let url = "https://swapi.dev/api/people/";
  let character = [];

    try {
      while (url !== null) {
        const data = await fetch(url);
        character = character.concat(data.results);
        url = data.next;
      }
      return character;
    } catch (error) {
      console.error("Error fetching data:", error);

  }
} */

// ADD TO FUNCTIONS ABOVE

async function fetchPeople(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function fetchAllPeople() {
  let url = "https://swapi.dev/api/people";
  let people = [];
  while (url !== null) {
    const data = await fetchPeople(url);
    people = people.concat(data.results);
    url = data.next;
  }
  return people;
}

// async function fetchCharacter(charId) {
//   let url = "https://swapi.dev/api/people/";
//   if (charId) {
//     url = `https://swapi.dev/api/people/${charId}`;
//     console.log(url);
//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       console.log("DATA", data);
//       return data;
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   } else {
//     try {
//       const response = await fetch(url);
//       const data = await response.json();

//       return data.results;
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }
// }

function displayCharacterDetails(id) {
  const character = JSON.parse(localStorage.getItem("characters"));
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

async function fetchPersonCards() {
  const people = await fetchAllPeople();
  const characterCard = document.querySelector(".info-listing");
  // console.log(people);
  localStorage.setItem("characters", JSON.stringify(people));
  // console.log("stored data", localStorage.getItem("characters"));
  if (people) {
    let peopleCount = 0;

    people.forEach((person) => {
      peopleCount++;
      // console.log(person);
      const card = document.createElement("div");
      card.classList.add("info-card");
      card.innerHTML = `
        <a href="../pages/charachter.html?id=${peopleCount}">
        <img src="../media/people/${peopleCount}.jpg" alt="${person.name}" />
        <div class="info-card-text">
        <p>Name: ${person.name}</p>
        <p>Birth Year: ${person.birth_year}</p>
        </div>
        </a>
      `;
      characterCard.appendChild(card);
    });
  }
}

function createPersonCards() {
  const allCharacters = JSON.parse(localStorage.getItem("characters"));
  const characterCard = document.querySelector(".info-listing");
  // console.log(allCharacters);
  let peopleCount = 0;

  allCharacters.forEach((character) => {
    peopleCount++;
    // console.log(character);
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

// console.log(JSON.parse(localStorage.getItem("character")));

if (!("characters" in localStorage)) {
  fetchPersonCards();
  // const allPeople = await fetchAllPeople();
} else {
  createPersonCards(characterIndex);
}

if (characterIndex >= 0 && "characters" in localStorage) {
  displayCharacterDetails(characterIndex);
}

/* async function fetchPeople() {
  const url = "https://swapi.dev/api/people/";
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function fetchPeople(charId) {
  let url = "https://swapi.dev/api/people/";
  if (charId) {
    url = `https://swapi.dev/api/people/${charId}`;
    console.log(url);
  }
  console.log(url);
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("DATA", data.results);
    return data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function createPersonCards() {
  const people = await fetchPeople();
  const characterCard = document.querySelector(".info-listing");

  if (people) {
    let peopleCount = 0;

    people.forEach((person) => {
      peopleCount++;
      const slug = person.name.toLowerCase().replace(/ /g, "-");
      const card = document.createElement("div");
      card.classList.add("info-card");
      card.innerHTML = `
        <a href="../pages/charachter.html?id=${peopleCount}">
        <img src="../media/people/${peopleCount}.jpg" alt="${person.name}" />
        <div class="info-card-text">
        <p>Name: ${person.name}</p>
        <p>Birth Year: ${person.birth_year}</p>
        </div>
        </a>
      `;
      characterCard.appendChild(card);
    });
  }
}

createPersonCards();
 */
