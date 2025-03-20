// JARED DONOHUE (jjd2203)

function highlightText(text, query) {
    if (!query) return text; 
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, `<span class="highlight">$1</span>`);
}

// ------- VIEW -------
function displaySwimRaces(swim_races, query) {
	const swimRaceContainer = $('#filtered-swim-races-container');
	swimRaceContainer.empty();

	if (swim_races.length == 0) {
		swimRaceContainer.append(`<h6>No results found for <span class="highlight">${query}</span>.</h6>`);
	} else {
		swimRaceContainer.append(`<p>Displaying ${swim_races.length} results for <span class="highlight">${query}</span></p>`);
		swim_races.forEach((race, index) => {
			// Card container
			// const card = $('<div>').addClass('card mb-2 shadow-sm search-card').css({
			// 	padding: '0px 8px 0 8px', // Reduce padding inside the card
			// 	borderRadius: '6px' // Slightly round corners for compact style
			// });
			const card = $('<a>')
			.attr('href', '/view/' + race.id) // Make the whole card clickable
			.addClass('card mb-2 shadow-sm search-card')
			.css({
				padding: '0px 8px 0 8px', // Reduce padding inside the card
				borderRadius: '6px', // Slightly round corners for compact style
				textDecoration: 'none', // Remove default underline
				color: 'inherit', // Keep text color unchanged
				display: 'block' // Ensure it behaves as a block element
			});

			// Row inside the card
			const row = $('<div>').addClass('row g-2'); // Use `g-2` to reduce gutter spacing

			// Image column
			const imgCol = $('<div>').addClass('col-2 d-flex align-items-center'); // Center the image vertically
			const img = $('<img>').addClass('img-fluid rounded-start').attr({
				src: race.image || 'path/to/placeholder-image.jpg',
				alt: 'Image of ' + race.title + " swim race."
			}).css({
				// height: '100%', // Limit image height for compact design
				width: '100%', // Ensure the image takes full width of its container
				objectFit: 'cover', // Crop the image to fit the container
				borderRadius: '4px' // Slightly round image corners
			});
			const link = $('<a>').attr('href', `/view/${race.id}`);
			link.append(img);
			imgCol.append(link);

			// Content column
			const contentCol = $('<div>').addClass('col-10'); // Adjust column width to fit content
			const cardBody = $('<div>').addClass('card-body p-2'); // Reduce padding inside the card body

			// Title with link
			const title = $('<h6>').addClass('card-title mb-1').css({ fontSize: '1rem'}); // Smaller font size for title
			title.append($('<a>')
				.attr('href', '/view/' + race.id)
				.html(highlightText(race.title, query)) 
			);

			// Date and Location
			const dateLocation = $('<p>').addClass('card-text text-muted mb-1').css({ fontSize: '0.85rem' }); // Smaller font size
			dateLocation.html(`${race.date} | ${highlightText(race.location_beach, query)}, ${highlightText(race.location_city_or_town, query)}`);

			// Distance
			const distance = $('<p>').addClass('card-text mb-1').css({ fontSize: '0.85rem' }); // Smaller font size
			distance.html(`<strong>Distance:</strong> ${highlightText(race.distance, query)}`);

			// Fee
			const fee = $('<p>').addClass('card-text mb-1').css({ fontSize: '0.85rem' }); // Smaller font size
			fee.html(`<strong>Entry Fee:</strong> ${highlightText(race.entry_fee, query)}`);

			// Requirement
			const requirement = $('<p>').addClass('card-text mb-1').css({ fontSize: '0.85rem' }); // Smaller font size
			fee.html(`<strong>Pre-Race Requirement:</strong> ${highlightText(race.prior_experience_requirement, query)}`);

			// Summary (truncate if necessary)
			const summary = $('<p>').addClass('card-text text-truncate').css({ fontSize: '0.85rem' }); // Truncate long summaries for compactness
			summary.html(highlightText(race.summary, query));

			// View More button (smaller size)
			const viewMore = $('<a>').addClass('btn btn-primary race-btn rounded-pill') // Smaller button size with top margin
				.attr('href', '/view/' + race.id).text('View Details');

			cardBody.append(title, dateLocation, distance, fee, requirement);
			contentCol.append(cardBody);

			row.append(imgCol, contentCol);
			card.append(row);
			swimRaceContainer.append(card);
		});
	}
}


// ---- AJAX ----
function searchSwimRaces(query) {
	$.ajax({
		type: "GET",
		url: "/api/search_results?q=" + encodeURIComponent(query),
		success: function(result) {
			let filtered_races = result["swim_races"];
			displaySwimRaces(filtered_races, query);
		},
		error: function(request, status, error) {
			console.log("Error:", error);
		}
	});
}

// ----- ON PAGE RELOAD ------
$(document).ready(function() {
    let params = new URLSearchParams(window.location.search);
    let query = params.get('q');
    if (query) {
		searchSwimRaces(query);
	}
});

