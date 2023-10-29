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
  try {
    const allCities = await loadCities();
    console.log("ALL CITIES", allCities);
  } catch (error) {}
}

// loadCities();
createCitiesListing();
