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

const storedChar = JSON.parse(localStorage.getItem("character"));

console.log(storedChar);

// console.log(JSON.parse(localStorage.getItem("character")));

displayCharacterDetails();
