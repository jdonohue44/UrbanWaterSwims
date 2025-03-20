// JARED DONOHUE (jjd2203)
function display_swim_race(race) {
    const swimRaceContainer = $('#single-swim-race-container');
    swimRaceContainer.empty();

    // Row 1: Race Image + Title & Summary
    let row1 = $('<div>').addClass('row mb-3 d-flex align-items-center');
    let imageCol1 = $('<div>').addClass('col-md-4');
    imageCol1.append(
        $('<img>').attr({
            src: race.image || 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Bold_and_the_Beautiful_swim.jpg/440px-Bold_and_the_Beautiful_swim.jpg',
            alt: race.title,
            class: 'img-fluid rounded'
        })
    );
    let textCol1 = $('<div>').addClass('col-md-8').append(
        $('<div>').addClass('race-header').append(
            $('<h1>').addClass('race-title').text(race.title).css('display', 'inline-block'),
            $('<a>').attr({
                href: `/edit/${race.id}`,
                class: 'edit-race-link'
            }).text('(edit this race)')),
        $('<p>').addClass('race-description').text(race.summary),
    );
    row1.append(textCol1, imageCol1);
    swimRaceContainer.append(row1);

    // Row 2: Key Race Info
    let row2 = $('<div>').addClass('row mb-3 d-flex align-items-center');
    let textCol2 = $('<div>').addClass('col-md-8 view_item_text').append(
        $(`<p><strong>Location:</strong> ${race.location_beach}, ${race.location_city_or_town}, ${race.location_metro}</p>`),
        $(`<p><strong>Date & Time:</strong> ${race.date} ${race.time ? race.time : ''}</p>`),
        $(`<p><strong>Distance:</strong> ${race.distance}</p>`),
        $(`<p><strong>Entry Fee:</strong> ${race.entry_fee}</p>`),
        $(`<p><strong>Prior Race Experience Required: </strong>${race.prior_experience_requirement}</p>`),
        $(`<p style="height:4px"></p>`),
        $(`<p style="color: #808080;"><strong>Expected Water Temperature:</strong> ${race.estimated_water_temp ? race.estimated_water_temp : ''}</p>`),
        $(`<p style="color: #808080;"><strong>Public Transit Directions:</strong> ${race.public_transit ? race.public_transit : ''}</p>`),
        $('<a>').attr({
            href: race.url,
            class: 'btn btn-primary race-btn rounded-pill',
            target: '_blank',
            rel: 'noopener noreferrer'
        }).html('Go to Race Website <span class="external-link-icon">↗</span>'),
        $('<a>').attr({
            href: '/search_results?q=' + race.location_metro,
            class: 'btn btn-primary search-btn rounded-pill',
        }).html('Explore More <b>' + race.location_metro + '</b> Races'));
        
    row2.append(textCol2);
    swimRaceContainer.append(row2);

    // Row 3: Race Course Map + Race Location Map
    let row3 = $('<div>').addClass('row mb-3 d-flex align-items-center');
    let imageCol3 = $('<div>').addClass('col-md-6');
    if (race.course_map) {
        imageCol3.append(
            $('<h6 style="margin: none; padding: none; color: #7a7a7a">').text('Course Map'),
            $('<img height="250">').attr({
                src: race.course_map,
                class: 'img-fluid rounded',
                alt: 'Course map for ' + race.title + ' swim race.'
            })
        );
    }
    let textCol3 = $('<div>').addClass('col-md-6')
        if (race.location_coords) {
            textCol3.append(
                $('<h6 style="margin: none; padding: none; color: #7a7a7a">').text('Race Location Google Map'),
                $(`<iframe width="100%" height="250" frameborder="0"
                    src="https://www.google.com/maps?q=${race.location_coords}&output=embed"
                    alt="Google maps widget showing the location of the swim race.">
                </iframe>`)
            );
        }
    row3.append(textCol3,imageCol3);
    swimRaceContainer.append(row3);
}

// ----- ON PAGE (RE)LOAD ------
$(document).ready(function() {
    display_swim_race(data["swim_race"]);
});
