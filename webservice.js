// var cors = require('cors');
// app.use(cors());

// let corsOptions = {
//     origin: 'http://localhost:3000',
//     methods: 'GET,POST,PUT,DELETE'
// }
// app.use(cors(corsOptions));


// let rooturl = 'http://localhost:3000/';
// let producturl = `http://localhost:3000/search-submit/`;
// let adminurl = 'http://localhost:3000/admin/';

// let selectallpd = document.querySelector(".search");
// let selectpd = document.querySelector("#selectpd");
// let insertproduct = document.querySelector("#insert")
// let deleteproduct = document.querySelector("#delete")

// let PRO_START = document.querySelector("#start")
// let PRO_END = document.querySelector("#end")
// let PRO_traveldate = document.querySelector("#traveldate")

// async function callWS(rooturl, method, sentData = {}) {
//     let data;
//     if (method == "selectallpd") {
//         let response = await fetch(producturl, {
//             method: "GET",
//         });
//         data = await response.json();
//     }
//     return data;
// }

// function WS_search(producturl, selectallpd) {
//     const searchForm = document.querySelector('.search');
//     const searchResultsSection = document.querySelector('#search-result');

//     searchForm.addEventListener('submit', async (event) => {
//         event.preventDefault();
//         const start = searchForm.querySelector('[name="start"]').value;
//         const end = searchForm.querySelector('[name="end"]').value;
//         const traveldate = searchForm.querySelector('[name="traveldate"]').value;
//         console.log("helpppp")
//         if (start || end || traveldate) {
//             producturl += '/?';
//             if (start) {
//                 producturl += start;
//             }
//             if (end) {
//                 producturl += end;
//             }
//             if (traveldate) {
//                 producturl += traveldate;
//             }
//         }

//         const response = await fetch('http://localhost:3000/search-submit/');
//         const { results } = await response.json();

//         searchResultsSection.innerHTML = '';
//         results.forEach((result) => {
//             const resultDiv = document.createElement('div');
//             resultDiv.innerHTML = `
//       <p>Departure Station: ${result.Departure_station}</p>
//       <p>Terminal Station: ${result.Terminal_station}</p>
//       <p>Travel Date: ${result.TicketDate}</p>
//     `;
//             searchResultsSection.appendChild(resultDiv);
//         });
//     });
// }







