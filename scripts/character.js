const searchParams = new URLSearchParams(window.location.search);
const characterIndex = searchParams.get("id");

async function fetchCharacter(charId) {
  let url = "https://swapi.dev/api/people/";
  if (charId) {
    url = `https://swapi.dev/api/people/${charId}`;
    console.log(url);
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("DATA", data);
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

async function displayCharacterDetails(id) {
  const character = await fetchCharacter(id);
  const characterDetails = document.querySelector(".character-details");
  const characterImage = document.querySelector(".character-image");

  if (character) {
    characterImage.innerHTML = `<img src="../media/people/${characterIndex}.jpg" alt="${character.name}" />`;

    characterDetails.innerHTML = `
          <h2>${character.name}</h2>
          <p>Birth Year: ${character.birth_year}</p>
          <p>Height: ${character.height}</p>
          <p>Mass: ${character.mass}</p>
          <!-- Add more details here -->
      `;
  } else {
    characterDetails.innerHTML = "<p>Character not found.</p>";
  }
}

async function createPersonCards() {
  const people = await fetchCharacter();
  const characterCard = document.querySelector(".info-listing");
  console.log(people);
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

// const storedChar = JSON.parse(localStorage.getItem("character"));

// console.log(storedChar);

// console.log(JSON.parse(localStorage.getItem("character")));

displayCharacterDetails(characterIndex);
createPersonCards();
