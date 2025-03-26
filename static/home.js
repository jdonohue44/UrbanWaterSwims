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

    // Group races by metro
    const groupedByMetro = {};
    swim_races.forEach(race => {
        if (!groupedByMetro[race.location_metro]) {
            groupedByMetro[race.location_metro] = [];
        }
        groupedByMetro[race.location_metro].push(race);
    });

    // For each metro, build collapsible table
    Object.keys(groupedByMetro).forEach((metro, index) => {
        const races = groupedByMetro[metro];

        // Sort races by date
        races.sort((a, b) => new Date(a.date) - new Date(b.date));

        const metroId = `metro-${index}`;
        const toggleId = `toggle-${index}`;

        // Create metro header with toggle link
        const metroHeader = $(`
            <h2 class="metro-header" style="cursor: pointer;" id="${toggleId}">
                <a style="color: #505050; text-decoration: none;">${metro} ▾</a>
            </h2>
        `);

        // Build race table (initially collapsed)
        const raceTable = $(`
            <table class="race-table table table-bordered table-striped table-hover mt-2" id="${metroId}">
                <thead class="table-light">
                    <tr>
                        <th style="width: 15%;">Date</th>
                        <th style="width: 15%;">City</th>
                        <th style="width: 20%;">Distance</th>
                        <th style="width: 20%;">Beach</th>
                        <th style="width: 30%;">Race</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        `);
        const raceBody = raceTable.find('tbody');

        races.forEach((race, i) => {
            const city = race.location_city_or_town;
            const rowClass = i >= 3 ? 'extra-row' : ''; // hide extra rows by default
            const raceRow = $(`
                <tr class="${rowClass}" ${i >= 3 ? 'style="display: none;"' : ''}>
                    <td style="font-weight: 500;">${race.date}</td>
                    <td style="font-weight: 400;"><a href="/search_results?q=${city}">${city}</a></td>
                    <td style="font-weight: 500;">${race.distance}</td>
                    <td style="font-weight: 400;">${race.location_beach}</td>
                    <td style="font-weight: 400;"><a href="/view/${race.id}" class="race-link">${race.title}</a></td>
                </tr>
            `);
            raceBody.append(raceRow);
        });

        // "Show all" button if more than 3 races
        if (races.length > 3) {
            const showAllRow = $(`
                <tr class="show-all-row">
                    <td colspan="5" style="text-align: center;">
                        <a href="#" class="show-all-link">Show all ${races.length} races</a>
                    </td>
                </tr>
            `);
            raceBody.append(showAllRow);

            showAllRow.find('.show-all-link').on('click', function (e) {
                e.preventDefault();
                raceTable.find('.extra-row').slideToggle();
                const isExpanded = $(this).text().includes('Show all');
                $(this).text(isExpanded ? 'Show less' : `Show all ${races.length} races`);
            });
        }

        // Toggle table visibility on header click
        metroHeader.on('click', function () {
            raceTable.slideToggle();
            const arrow = $(this).find('a');
            arrow.html(arrow.html().includes('▸') ? `${metro} ▾` : `${metro} ▸`);
        });

        container.append(metroHeader);
        container.append(raceTable);
    });
}


// ------- CONTROLLERS -------
$(document).ready(function() {
    display_swim_races(data["swim_races"]);
});