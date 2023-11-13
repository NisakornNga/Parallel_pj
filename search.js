// const ws = require('../')

document.getElementById("search-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting normally
    const form = event.target;
    const departureStation = form.elements["start"].value;
    const terminalStation = form.elements["end"].value;
    const traveldate = form.elements["traveldate"].value;
    fetch(`http://localhost:3000/search-submit/${departureStation}/${terminalStation}/${traveldate}`)
      .then(response => response.json())
      .then(data => {
        // Handle the search results
        console.log(data);
      })
      .catch(error => console.error(error));
  });

