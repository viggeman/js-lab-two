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

async function createPersonCards() {
  const people = await fetchPeople();
  const appCard = document.querySelector(".info-listing");
  console.log(people);

  if (people) {
    let peopleCount = 0;
    people.forEach((person) => {
      const card = document.createElement("div");
      peopleCount++;
      card.classList.add("info-card");
      card.innerHTML = `
        <img src="media/people/${peopleCount}.jpg" alt="${person.name}" />
        <p>Name: ${person.name}</p>
        <p>Birth Year: ${person.birth_year}</p>
      `;
      appCard.appendChild(card);
    });
  }
}

createPersonCards();
