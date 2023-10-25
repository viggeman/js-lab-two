const searchParams = new URLSearchParams(window.location.search);
const characterIndex = searchParams.get("id");

async function fetchPeople() {
  const url = "https://swapi.dev/api/people/";
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function displayCharacterDetails() {
  const people = await fetchPeople();
  const characterDetails = document.querySelector(".character-details");
  localStorage.setItem("character", JSON.stringify(people));
  if (people) {
    const person = people[0];
    characterDetails.innerHTML = `
          <h2>${person.name}</h2>
          <p>Birth Year: ${person.birth_year}</p>
          <p>Height: ${person.height}</p>
          <p>Mass: ${person.mass}</p>
          <!-- Add more details here -->
      `;
  } else {
    characterDetails.innerHTML = "<p>Character not found.</p>";
  }
}

async function createPersonCards() {
  const people = await fetchPeople();
  const appCard = document.querySelector(".info-listing");
  console.log(people);

  if (people) {
    let peopleCount = 0;

    people.forEach((person) => {
      peopleCount++;
      const slug = person.name.toLowerCase().replace(/ /g, "-");
      const card = document.createElement("div");
      card.classList.add("info-card");
      card.innerHTML = `
        <a href="${slug}.html">
        <img src="../media/people/${peopleCount}.jpg" alt="${person.name}" />
        <div class="info-card-text">
        <p>Name: ${person.name}</p>
        <p>Birth Year: ${person.birth_year}</p>
        </div>
        </a>
      `;
      appCard.appendChild(card);
    });
  }
}

// const storedChar = JSON.parse(localStorage.getItem("character"));

// console.log(storedChar);

// console.log(JSON.parse(localStorage.getItem("character")));

displayCharacterDetails();
createPersonCards();
