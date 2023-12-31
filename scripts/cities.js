const postForm = document.querySelector("#city-post-form");
const cityInput = document.querySelector("#city-name");
const populationInput = document.querySelector("#population");
const citySelect = document.querySelector("#city-select");
const searchForm = document.querySelector("#change-city");
const patchForm = document.querySelector("#patch-form");
const patchButton = document.querySelector("#change-button");
const deleteButton = document.querySelector("#delete-button");

const url = "https://avancera.app/cities/";

// Function for POST city

async function postData() {
  const cityName = cityInput.value;
  const population = Number(populationInput.value);
  const data = { name: cityName, population: population };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

// Function to present city to be Patched

async function findCity(city) {
  const searchUrl = url + "?name=" + city;

  try {
    const response = await fetch(searchUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

//Eventlistener to Patch a city
patchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const patchNameInput = document.querySelector("#patch-name");
  const patchPopulationInput = document.querySelector("#patch-population");
  const patchIdInput = document.querySelector("#patch-id");
  const patchId = patchIdInput.value;
  const patchName = patchNameInput.value;
  const patchPopulation = Number(patchPopulationInput.value);
  try {
    const repsonse = await patchData(patchId, patchName, patchPopulation);
    if (repsonse) {
      alert("City of: " + patchName + " was sucessfully changed");
      location.reload();
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

// PATCH data function
async function patchData(id, cityName, cityPop) {
  const patchUrl = url + id;
  const data = { name: cityName, population: cityPop };

  try {
    const response = await fetch(patchUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// DELETE city function
async function deleteData(id) {
  const deleteUrl = url + id;

  try {
    alert("are you sure?");
    const response = await fetch(deleteUrl, {
      method: "DELETE",
    });
    if (response) {
      // location.reload();
    }
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Eventlistener for adding new City to POST

postForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const result = await postData();

    if (result) {
      const cityAdded = result.pop();
      alert(`It's a success, city: ${cityAdded.name} was added!`);
      location.reload();
    }
  } catch (error) {
    alert("You totally failed");
    console.error("Error fetching data:", error);
  }
});

// Fetch City Data
async function loadCities() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

//Eventlistener for find city

patchButton.addEventListener("click", async (event) => {
  event.preventDefault();
  const citySearch = citySelect.value;
  try {
    const result = await findCity(citySearch);
    const population = result[0].population;
    const id = result[0].id;
    const city = result[0].name;

    if (result) {
      patchForm.innerHTML = `
      <label for="patch-id">City ID, disabled:</label>
      <input type="text" id="patch-id" name="patch-id" value="${id}" disabled/>
      <label for="patch-name">Current City Name:</label>
      <input type="text" id="patch-name" name="patch-name" value="${city}" required/>
      <label for="patch-population">Current City Population:</label>
      <input type="number" id="patch-population" name="patch-population" value="${population}" required/>
      <input type="submit" value="Update City">
      `;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

// Eventlistener delete
deleteButton.addEventListener("click", async (event) => {
  event.preventDefault();
  const citySearch = citySelect.value;

  try {
    const result = await findCity(citySearch);
    if (result) {
      const deleteCity = await deleteData(result[0].id);
      location.reload();
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

async function createCitiesListing() {
  const citiesDiv = document.querySelector("#city-list");

  const allCities = await loadCities();

  if (allCities) {
    const cityNames = allCities.map((cityName) => cityName.name);
    allCities.forEach((city) => {
      // Creates list of cities for display

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
      cityOption.id = city.id;
      cityOption.innerText = cityName;
      citySelect.appendChild(cityOption);
    });
  }
}

createCitiesListing();
