const postForm = document.querySelector("#city-post-form");
const errorMsg = document.querySelector("#error-msg");
const success = document.querySelector("#success");
const cityInput = document.querySelector("#city-name");
const populationInput = document.querySelector("#population");
const searchForm = document.querySelector("#search-city-form");
console.log(searchForm);
const url = "https://avancera.app/cities/";

async function postData() {
  const cityName = cityInput.value;
  const population = Number(populationInput.value);
  const data = { name: cityName, population: population };
  console.log(data);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

postForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  try {
    const result = await postData();
    console.log("hej", result);
    if (result) {
      const cityAdded = result.pop();
      console.log(cityAdded);
      success.textContent = `It's a success, city: ${cityAdded.name} was added!`;
      cityInput.value = "";
      populationInput.value = "";
      setTimeout(function () {
        location.reload();
      }, 3000);
    }
  } catch (error) {
    errorMsg.textContent = "You totally failed";
    console.error("Error fetching data:", error);
  }
});

async function loadCities() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function createCitiesListing() {
  const citiesDiv = document.querySelector("#city-list");

  const allCities = await loadCities();
  console.log("ALL CITIES", allCities);

  if (allCities) {
    allCities.forEach((city) => {
      console.log(city.population);
      const cityInfo = document.createElement("div");
      cityInfo.classList.add("city-info");
      const cityName = city.name;
      const cityPop = city.population;
      cityInfo.innerHTML = `
      <h3>${cityName}</h2>
      <p>Population: ${cityPop}</p>
      `;
      citiesDiv.appendChild(cityInfo);
    });
  }
}

createCitiesListing();
