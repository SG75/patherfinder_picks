// script.js

// Synonyms dictionary for variations of keywords
const synonyms = {
  beach: ["beach", "beaches", "water", "scenic"],
  temple: [
    "temple",
    "temples",
    "religious",
    "heritage",
    "architecture",
    "monument",
    "unesco",
  ],
  city: [
    "city",
    "cities",
    "nightlife",
    "culture",
    "cultural",
    "hub",
    "diverse",
    "landmark",
    "symbol",
  ],
  country: ["country", "countries"],
};

// Function to normalize search keywords
function normalizeSearch(query) {
  const lowerQuery = query.toLowerCase();
  for (const [key, variations] of Object.entries(synonyms)) {
    if (variations.includes(lowerQuery)) {
      return key; // Return the normalized keyword
    }
  }
  return lowerQuery; // Return original if no match
}

// Fetch data from the JSON file
function fetchAndDisplayResults() {
  fetch("./picks.json") // Path to  JSON file
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json(); // Parse JSON
    })
    .then((data) => {
      const searchInput = document
        .querySelector(".search-input")
        .value.trim()
        .toLowerCase();
      const normalizedInput = normalizeSearch(searchInput);
      const searchResults = document.getElementById("searchResults");
      searchResults.innerHTML = ""; // Clear previous results

      // Search in countries, temples, and beaches
      const matchedResults = [];

      // Search countries and their cities
      data.countries.forEach((country) => {
        // Match country name
        if (country.name.toLowerCase().includes(normalizedInput)) {
          matchedResults.push(country);
        }

        // Match cities within the country
        country.cities.forEach((city) => {
          if (
            city.name.toLowerCase().includes(normalizedInput) ||
            city.description.toLowerCase().includes(normalizedInput)
          ) {
            matchedResults.push(city);
          }
        });
      });

      // Search temples
      data.temples.forEach((temple) => {
        if (
          temple.name.toLowerCase().includes(normalizedInput) ||
          temple.description.toLowerCase().includes(normalizedInput)
        ) {
          matchedResults.push(temple);
        }
      });

      // Search beaches
      data.beaches.forEach((beach) => {
        if (
          beach.name.toLowerCase().includes(normalizedInput) ||
          beach.description.toLowerCase().includes(normalizedInput)
        ) {
          matchedResults.push(beach);
        }
      });

      // Display matched results
      if (matchedResults.length > 0) {
        matchedResults.forEach((result) => {
          const resultDiv = document.createElement("div");
          resultDiv.classList.add("result-item");
          resultDiv.innerHTML = `
              <img src="${result.imageUrl}" alt="${result.name}" class="result-image" />
              <div class="result-info">
                <h3>${result.name}</h3>
                <p>${result.description}</p>
                <button class="btn_visit">Visit</button>
              </div>
            `;
          searchResults.appendChild(resultDiv);
        });
      } else {
        searchResults.innerHTML = "<h2>No results found !!!</h2>";
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Attach event listeners
document
  .querySelector(".search-button")
  .addEventListener("click", fetchAndDisplayResults);
document.querySelector(".clear-button").addEventListener("click", () => {
  document.querySelector(".search-input").value = "";
  document.getElementById("searchResults").innerHTML = "";
});

// Trigger search when pressing Enter key
document
  .querySelector(".search-input")
  .addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      fetchAndDisplayResults();
    }
  });
