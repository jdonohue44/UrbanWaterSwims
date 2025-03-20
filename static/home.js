// JARED DONOHUE (jjd2203)

// ------- VIEW -------

// ------- ACCORDION OPTION -------
// function display_swim_races(swim_races) {
//     const container = $('#swim-races-container');
//     container.empty();

//     // Group races by metropolitan area and city
//     const groupedByMetro = {};
//     swim_races.forEach(race => {
//         if (!groupedByMetro[race.location_metro]) {
//             groupedByMetro[race.location_metro] = {};
//         }
//         if (!groupedByMetro[race.location_metro][race.location_city_or_town]) {
//             groupedByMetro[race.location_metro][race.location_city_or_town] = [];
//         }
//         groupedByMetro[race.location_metro][race.location_city_or_town].push(race);
//     });

//     // Create nested tree structure
//     Object.keys(groupedByMetro).forEach(metro => {
//         const metroHeader = $(`<h2 class="metro-header"><a href="/search_results?q=${metro}" style="color: #0087a2;">${metro}</a></h2>`);
//         const cityList = $('<ul class="city-list"></ul>');

//         Object.keys(groupedByMetro[metro]).forEach(city => {
//             // Sort races by date
//             groupedByMetro[metro][city].sort((a, b) => new Date(a.date) - new Date(b.date));
            
//             const cityHeader = $(`<h3 class="city-header collapsible"><a href="/search_results?q=${city}" style="color: #0087a2;">${city}</a></h3>`);
//             const raceList = $('<ul class="race-list"></ul>');

//             groupedByMetro[metro][city].forEach(race => {
//                 const raceItem = $(
//                     `<li class="race-item">
//                         <a href="/view/${race.id}" class="race-link">
//                             <img src="${race.image || 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Bold_and_the_Beautiful_swim.jpg/440px-Bold_and_the_Beautiful_swim.jpg'}" class="race-img" alt="Thumbnail image of ${race.title} swim race.">
//                             <b>${race.date}</b>. ${race.title}. ${race.location_beach}</b>
//                         </a>
//                     </li>`
//                 );
//                 raceList.append(raceItem);
//             });

//             cityList.append($('<li>').append(cityHeader, raceList));
//         });

//         container.append(metroHeader, cityList);
//     });
// }




// ------- TABLE OPTION -------
function display_swim_races(swim_races) {
    const container = $('#swim-races-container');
    container.empty();

    // Group races by metropolitan area and city
    const groupedByMetro = {};
    swim_races.forEach(race => {
        if (!groupedByMetro[race.location_metro]) {
            groupedByMetro[race.location_metro] = {};
        }
        if (!groupedByMetro[race.location_metro][race.location_city_or_town]) {
            groupedByMetro[race.location_metro][race.location_city_or_town] = [];
        }
        groupedByMetro[race.location_metro][race.location_city_or_town].push(race);
    });

    // Create nested tree structure with tables
    Object.keys(groupedByMetro).forEach(metro => {
        // const metroHeader = $(`<h3 class="metro-header">${metro}</h3>`);
        const metroHeader = $(`<h2 class="metro-header"><a href="/search_results?q=${metro}" style="color: #505050">${metro}</a></h2>`);
        const cityList = $('<div class="city-list"></div>');

        Object.keys(groupedByMetro[metro]).forEach(city => {
            // Sort races by date
            groupedByMetro[metro][city].sort((a, b) => new Date(a.date) - new Date(b.date));
            
            // const cityHeader = $(`<h5 class="city-header collapsible d-flex align-items-center" data-expanded="true">
            //     <span class="toggle-icon">&#9662;</span> <span class="ms-2">${city}</span>
            // </h5>`);

            const cityHeader = $(`<h3 class="city-header"><a href="/search_results?q=${city}" style="color: #505050">${city}</a></h3>`);
            
            const raceTable = $(`
                <table class="race-table table table-bordered table-striped table-hover mt-2">
                <thead class="table-light">
                    <tr>
                        <th style="width: 20%;">Date</th>
                        <th style="width: 20%;">Distance</th>
                        <th style="width: 25%;">Beach</th>
                        <th style="width: 35%;">Race</th>
                    </tr>
                </thead>
                <tbody></tbody>
                </table>
                `);
            const raceBody = raceTable.find('tbody');

            groupedByMetro[metro][city].forEach(race => {
                const raceRow = $(
                    `<tr>
                        <td style="font-weight: 500;">${race.date}</td>
                        <td style="font-weight: 500;">${race.distance}</td>
                        <td style="font-weight: 400;">${race.location_beach}</td>
                        <td style="font-weight: 400;"><a href="/view/${race.id}" class="race-link">${race.title}</a></td>
                    </tr>`
                );
                raceBody.append(raceRow);
            });

            cityList.append($('<div class="row">')
                .append($('<div class="col-12">').append(cityHeader, raceTable)));
        });

        container.append(metroHeader, cityList);
    });
}



// ------- CONTROLLERS -------
$(document).ready(function() {
    display_swim_races(data["swim_races"]);
});



// ----- TOP X ONLY ---- 
// function display_swim_races(swim_races) {
//     const container = $('#swim-races-container');
//     container.empty();

//     // Group races by metropolitan area and city
//     const groupedByMetro = {};
//     swim_races.forEach(race => {
//         if (!groupedByMetro[race.location_metro]) {
//             groupedByMetro[race.location_metro] = {};
//         }
//         if (!groupedByMetro[race.location_metro][race.location_city_or_town]) {
//             groupedByMetro[race.location_metro][race.location_city_or_town] = [];
//         }
//         groupedByMetro[race.location_metro][race.location_city_or_town].push(race);
//     });

//     // Create nested tree structure with tables
//     Object.keys(groupedByMetro).forEach(metro => {
//         const metroHeader = $(`<h2 class="metro-header"><a href="/search_results?q=${metro}" style="color: #505050">${metro}</a></h2>`);
//         const cityList = $('<div class="city-list"></div>');

//         Object.keys(groupedByMetro[metro]).forEach(city => {
//             // Sort races by date
//             groupedByMetro[metro][city].sort((a, b) => new Date(a.date) - new Date(b.date));

//             // Create city header
//             const cityHeader = $(`<h3 class="city-header"><a href="/search_results?q=${city}" style="color: #505050">${city}</a></h3>`);

//             // Create race table
//             const raceTable = $(`
//                 <table class="race-table table table-bordered table-striped table-hover mt-2">
//                     <thead class="table-light">
//                         <tr>
//                             <th style="width: 20%;">Date</th>
//                             <th style="width: 20%;">Distance</th>
//                             <th style="width: 25%;">Beach</th>
//                             <th style="width: 35%;">Race</th>
//                         </tr>
//                     </thead>
//                     <tbody></tbody>
//                 </table>
//             `);
//             const raceBody = raceTable.find('tbody');

//             // Limit to top 3 races
//             const topRaces = groupedByMetro[metro][city].slice(0, 1);
//             topRaces.forEach(race => {
//                 const raceRow = $(`
//                     <tr>
//                         <td style="font-weight: 600;">${race.date}</td>
//                         <td style="font-weight: 600;">${race.distance}</td>
//                         <td style="font-weight: 400;">${race.location_beach}</td>
//                         <td style="font-weight: 400;"><a href="/view/${race.id}" class="race-link">${race.title}</a></td>
//                     </tr>
//                 `);
//                 raceBody.append(raceRow);
//             });

//             // Add final row with search link if more races exist
//             if (groupedByMetro[metro][city].length > 1) {
//                 const searchRow = $(`
//                     <tr>
//                         <td colspan="4" class="text-center">
//                             <a href="/search_results?q=${city}" class="fw-bold text-primary">Search all races in ${city} →</a>
//                         </td>
//                     </tr>
//                 `);
//                 raceBody.append(searchRow);
//             }

//             cityList.append($('<div class="row">')
//                 .append($('<div class="col-12">').append(cityHeader, raceTable)));
//         });

//         container.append(metroHeader, cityList);
//     });
// }

// // ------- CONTROLLERS -------
// $(document).ready(function() {
//     display_swim_races(data["swim_races"]);
// });
