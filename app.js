const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("reset");
const searchInput = document.getElementById("search");
const bookBtn = document.getElementById("bookBtn");
const resultDiv = document.getElementById("");

async function fetchTravelData() {
  try {
    const response = await fetch("travel_recommendation.json");
    if (!response.ok) throw new Error("Failed to fetch data");
    const data = await response.json();
    console.log("Fetched data: ", data);
    return data;
  } catch (error) {
    console.log("Error fetching data!");
  }
}

function displayResults(places) {
  resultDiv.innerHTML = "";
  if (places.length === 0) {
    resultDiv.innerHTML = `<p> No results found. Try another keyword.<p>`;
    return;
  }

  places.forEach((place) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <img src="${place.imageUrl}" alt="${place.name}" width="400">
    <h3>${place.name}</h3>
    <p>${place.description}</p>`;
    resultDiv.appendChild(card);
  });
}

searchBtn.addEventListener("click", async () => {
  const keyword = searchInput.value.trim().toLowerCase();
  if (!keyword) return;

  const data = await fetchTravelData();
  let results = [];

  if (["beach", "beaches"].includes(keyword)) {
    results = data.beaches;
  } else if (["temple", "temples"].includes(keyword)) {
    results = data.temples;
  } else {
    const matchedCountry = data.countries.find((country) =>
      country.name.toLowerCase().includes(keyword)
    );
    if (matchedCountry) {
      results = matchedCountry.cities;
    }
  }
  displayResults(results);
});

resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  resultDiv.innerHTML = "";
});
