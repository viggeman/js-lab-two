/* async function fetchPeople() {
  const url = "https://swapi.dev/api/people/";
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
} */

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
