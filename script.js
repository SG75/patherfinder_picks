fetch("picks.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // Parse the JSON data
  })
  .then((data) => {
    console.log(data);
    // Access properties, e.g., console.log(data.name);
  })
  .catch((error) => {
    console.error("Error fetching the JSON file:", error);
  });
