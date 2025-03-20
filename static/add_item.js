// JARED DONOHUE (jjd2203)
$(document).ready(function () {
    // Dynamically create the form
    const form = $('<form>').attr('id', 'add-swim-race-form');

    // Create error and success message containers
    const errorMessage = $('<div>').attr('id', 'error-message').addClass('alert alert-danger').css('display', 'none');
    const successMessage = $('<div>').attr('id', 'success-message').addClass('alert alert-success').css('display', 'none');
    form.append(errorMessage, successMessage);

    // Create form fields
    const fields = [
        { id: 'title', label: 'Title:', type: 'text', required: true },
        { id: 'date', label: 'Date:', type: 'text', required: true },
        { id: 'location_metro', label: 'Metro Location:', type: 'text', required: true },
        { id: 'location_city_or_town', label: 'Neighborhood:', type: 'text', required: true },
        { id: 'location_beach', label: 'Beach:', type: 'text', required: true },
        // { id: 'location_lat', label: 'Latitude:', type: 'text', required: true, placeholder: 'e.g., 40.57263' },
        // { id: 'location_lng', label: 'Longitude:', type: 'text', required: true, placeholder: 'e.g., -73.9773871' },
        { id: 'url', label: 'URL:', type: 'text', required: true, placeholder: 'e.g., https://example.com' },
        // { id: 'image', label: 'Image URL:', type: 'text', required: true, placeholder: 'e.g., https://example.com/image.jpg' },
        { id: 'distance', label: 'Distance:', type: 'text', placeholder: 'e.g., 1 mile', required: true },
        // { id: 'course_map', label: 'Course Map URL:', type: 'text', placeholder: 'e.g., https://example.com/map.png' },
        // { id: 'time', label: 'Time:', type: 'text', placeholder: 'e.g., 7:30 am', required: true },
        // { id: 'estimated_water_temp', label: 'Estimated Water Temperature:', type: 'text', placeholder: 'e.g., 69F', required: true },
        // { id: 'public_transit', label: 'Public Transit Directions:', type: 'text', placeholder: 'e.g., Take the Q train...', required: true },
        { id: 'entry_fee', label: 'Entry Fee:', type: 'text', placeholder: 'e.g., $40', required: true },
        { id: 'prior_experience_requirement', label: 'Prior Experience Requirement:', type: 'text', placeholder: 'e.g., None' },
        { id: 'summary', label: 'Summary:', type: 'textarea', placeholder: 'e.g., Entry-level swim race...', required: true }
    ];

    fields.forEach(field => {
        const formGroup = $('<div>').addClass('d-flex align-items-center mb-2');
    
        const label = $('<label>').attr('for', field.id).text(field.label).css({
            'font-weight': 'bold',
            'margin-right': '10px',
            'width': '150px', // Set a fixed width for alignment
            'text-align': 'right' // Align text to the right for consistency
        });
    
        let input;
        if (field.type === 'textarea') {
            input = $('<textarea>').attr({
                id: field.id,
                class: 'form-control',
                placeholder: field.placeholder || '',
                required: field.required
            }).css({
                'flex': '1',
                'min-height': '80px' // Ensure a reasonable height for textareas
            });
        } else {
            input = $('<input>').attr({
                id: field.id,
                type: field.type,
                class: 'form-control',
                placeholder: field.placeholder || '',
                required: field.required
            }).css({
                'flex': '1',
                'min-width': '200px' // Ensures consistency
            });
        }
    
        formGroup.append(label, input);
        form.append(formGroup);
    });
    
    

    // Create submit button
    const submitButton = $('<button>')
    .attr('type', 'submit')
    .addClass('btn btn-primary add-race-btn rounded-pill btn-lg my-3 mx-2 w-100')
    .text('Submit');
    form.append(submitButton);

    // Append the form to the container
    $('#add-swim-race-form-container').append(form);

    // Form submission handler
    form.submit(function (event) {
        event.preventDefault(); // Prevent page reload

        // Collect form data
        let formData = {
            date: $("#date").val().trim(),
            location_metro: $("#location_metro").val().trim(),
            location_city_or_town: $("#location_city_or_town").val().trim(),
            location_beach: $("#location_beach").val().trim(),
            // location_coords: [$("#location_lat").val().trim(), $("#location_lng").val().trim()],
            title: $("#title").val().trim(),
            url: $("#url").val().trim(),
            // image: $("#image").val().trim(),
            distance: $("#distance").val().trim(),
            // course_map: $("#course_map").val().trim(),
            // time: $("#time").val().trim(),
            // estimated_water_temp: $("#estimated_water_temp").val().trim(),
            // public_transit: $("#public_transit").val().trim(),
            entry_fee: $("#entry_fee").val().trim(),
            prior_experience_requirement: $("#prior_experience_requirement").val().trim(),
            summary: $("#summary").val().trim(),
        };

        // Validate fields
        let errors = validateForm(formData);
        if (errors.length > 0) {
            showErrors(errors);
            return;
        }

        // Send data via AJAX
        $.ajax({
            type: "POST",
            url: "/add",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (response) {
                console.log(response)
                // Show success message with a link to view the new race
                successMessage.html(
                    `✅ New item successfully created. <a href="/view/${response.id}" target="_blank">See it here</a>.`
                ).show();

                // Clear form fields
                form[0].reset();
                $("#date").focus(); // Set focus to the first input field
            },
            error: function () {
                alert("❌ Error adding swim race. Please try again.");
            }
        });
    });

    // Function to validate form fields
    function validateForm(data) {
        let errors = [];
        if (!data.date) errors.push("Date is required.");
        if (!data.location_metro) errors.push("Metro location is required.");
        if (!data.location_city_or_town) errors.push("City/town is required.");
        if (!data.location_beach) errors.push("Beach is required.");
        // if (!data.location_coords[0] || !data.location_coords[1]) errors.push("Latitude and longitude are required.");
        if (!data.title) errors.push("Title is required.");
        if (!data.url) errors.push("URL is required.");
        // if (!data.image) errors.push("Image URL is required.");
        if (!data.distance.match(/^[\d.]+\s?(mile|km)$/)) errors.push("Distance must be a valid number followed by 'mile' or 'km'.");
        // if (!data.time.match(/^\d{1,2}:\d{2}\s?(am|pm)$/i)) errors.push("Time must be in the format '7:30 am'.");
        // if (!data.estimated_water_temp.match(/^\d+F$/)) errors.push("Estimated water temperature must be in the format '69F'.");
        // if (!data.public_transit) errors.push("Public transit directions are required.");
        if (!data.entry_fee.match(/^\$\d+$/)) errors.push("Entry fee must be a valid amount (e.g., $40).");
        if (!data.summary) errors.push("Summary is required.");
        return errors;
    }

    // Function to display validation errors
    function showErrors(errors) {
        let errorList = errors.map(error => `<li>${error}</li>`).join("");
        errorMessage.html(`<ul>${errorList}</ul>`).show();
    }
});

