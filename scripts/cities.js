const postForm = document.querySelector("#city-post-form");
const errorMsg = document.querySelector("#error-msg");
const success = document.querySelector("#success");
const cityInput = document.querySelector("#city-name");
const populationInput = document.querySelector("#population");
const citySelect = document.querySelector("#city-select");
const searchForm = document.querySelector("#change-city");
const patchDeleteForm = document.querySelector("#patch-form");

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

async function findCity(city) {
  const searchUrl = url + "?name=" + city;
  console.log(searchUrl);
  try {
    const response = await fetch(searchUrl);
    const data = await response.json();
    console.log(data[0].population);

    if (response) {
      patchDeleteForm.innerHTML = `
      <input type="text" id="patch-name" name="patch-name" value="${city}"/>
      <input type="number" id="patch-population" name="patch-population" value="${data[0].population}"/>
      `;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

postForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  console.log(event);
  try {
    const result = await postData();
    console.log("hej", result);
    if (result) {
      const cityAdded = result.pop();
      success.textContent = `It's a success, city: ${cityAdded.name} was added!`;
      cityInput.value = "";
      populationInput.value = "";
      // setTimeout(function () {
      //   location.reload();
      // }, 3000);
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

//Eventlistener for find city

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const citySearch = citySelect.value;
  try {
    const result = await findCity(citySearch.toString());
    console.log(result);
  } catch (error) {}
});

async function createCitiesListing() {
  const citiesDiv = document.querySelector("#city-list");

  const allCities = await loadCities();

  if (allCities) {
    const cityNames = allCities.map((cityName) => cityName.name);
    allCities.forEach((city) => {
      // Creates list of cities for display
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
      // Creates Options for city Select form
      const cityOption = document.createElement("option");
      cityOption.innerText = cityName;
      citySelect.appendChild(cityOption);
    });
  }
}

createCitiesListing();
