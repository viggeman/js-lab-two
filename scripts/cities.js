const form = document.querySelector("#myForm");
const errorMsg = document.querySelector("#error-msg");
const success = document.querySelector("#success");
const cityInput = document.querySelector("#city-name");
const populationInput = document.getElementById("population");

async function postData() {
  const cityName = cityInput.value;
  const population = Number(populationInput.value);
  const data = { name: cityName, population: population };
  console.log(data);

  const response = await fetch("https://avancera.app/cities/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  try {
    const result = await postData();
    if (result) {
      success.textContent = "It's a success";
      cityInput.value = "";
      populationInput.value = "";
      console.log(form.value);
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
    const response = await fetch("https://avancera.app/cities/");
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
