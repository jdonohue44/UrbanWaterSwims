// JARED DONOHUE (jjd2203)
$(document).ready(function () {
    // Create form
    const form = $('<form>').attr('id', 'edit-swim-race-form');

    // Create message containers
    const errorMessage = $('<div>', {
        id: 'error-message',
        class: 'alert alert-danger',
        css: { display: 'none' }
    });
    
    const successMessage = $('<div>', {
        id: 'success-message',
        class: 'alert alert-success',
        css: { display: 'none' }
    });

    form.append(errorMessage, successMessage);

    // Define form fields
    const fields = [
        { id: 'date', label: 'Date:', type: 'text', required: true },
        { id: 'location_metro', label: 'Metro Location:', type: 'text', required: true },
        { id: 'location_city_or_town', label: 'City/Town:', type: 'text', required: true },
        { id: 'location_beach', label: 'Beach:', type: 'text', required: true },
        { id: 'title', label: 'Title:', type: 'text', required: true },
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
        const label = $('<label>', { for: field.id, text: field.label });
        let input;

        if (field.type === 'textarea') {
            input = $('<textarea>', {
                id: field.id,
                class: 'form-control',
                placeholder: field.placeholder || '',
                required: field.required
            });
        } else {
            input = $('<input>', {
                id: field.id,
                type: field.type,
                class: 'form-control',
                placeholder: field.placeholder || '',
                required: field.required
            });
        }

        form.append(label, input);
    });

    // Buttons
    const submitButton = $('<button>', {
        type: 'submit',
        class: 'btn btn-primary add-race-btn rounded-pill btn-lg my-3 mx-2 w-100',
        text: 'Submit'
    });
    
    const discardButton = $('<button>', {
        type: 'button',
        class: 'btn btn-danger rounded-pill btn-lg my-3 mx-2 w-100',
        text: 'Discard Changes',
        click: function () {
            if (confirm("Are you sure you want to discard your changes?")) {
                window.location.href = "/view/" + data.swim_race.id;
            }
        }
    });

    form.append(submitButton, discardButton);

    // Append form to container
    $('#edit-swim-race-form-container').append(form);

    // Populate form fields with existing data
    if (data && data.swim_race) {
        fields.forEach(field => {
            $(`#${field.id}`).val(data.swim_race[field.id] || '');
        });
    }

    // Form submission handler
    form.submit(function (event) {
        event.preventDefault();

        let formData = {};
        fields.forEach(field => {
            formData[field.id] = $(`#${field.id}`).val().trim();
        });

        // Validate fields
        let errors = validateForm(formData);
        if (errors.length > 0) {
            showErrors(errors);
            return;
        }

        // Send data via AJAX
        $.ajax({
            type: "POST",
            url: "/edit/" + data.swim_race.id,
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (response) {
                successMessage.html(
                    `✅ Item successfully updated. <a href="/view/${response.id}" target="_blank">See it here</a>.`
                ).show();
                form[0].reset();
                $("#date").focus();
            },
            error: function () {
                alert("❌ Error editing swim race. Please try again.");
            }
        });
    });

    // Function to validate form fields
    function validateForm(data) {
        let errors = [];
        // Clear previous invalid states
        $('input, textarea').removeClass('invalid');

        // Validation logic
        if (!data.date) {
            errors.push("Date is required.");
            $('#date').addClass('invalid');
        }
        if (!data.location_metro) {
            errors.push("Metro location is required.");
            $('#location_metro').addClass('invalid');
        }
        if (!data.date) errors.push("Date is required.");
        if (!data.location_metro) errors.push("Metro location is required.");
        if (!data.location_city_or_town) errors.push("City/town is required.");
        if (!data.location_beach) errors.push("Beach is required.");
        if (!data.title) errors.push("Title is required.");
        if (!data.url) errors.push("URL is required.");
        // if (!data.image) errors.push("Image URL is required.");
        // if (!data.time.match(/^[0-9]{1,2}:[0-9]{2}\s?(am|pm)$/i)) errors.push("Time must be in the format '7:30 am'.");
        // if (!data.estimated_water_temp.match(/^\d+F$/)) errors.push("Estimated water temperature must be in the format '69F'.");
        // if (!data.public_transit) errors.push("Public transit directions are required.");
        if (!data.entry_fee.match(/^\$\d+$/)) errors.push("Entry fee must be a valid amount (e.g., $40)." );
        if (!data.summary) errors.push("Summary is required.");
        return errors;
    }

    // Function to display validation errors
    function showErrors(errors) {
        // Clear previous errors
        $('.error-message').remove();
    
        errors.forEach(error => {
            const fieldId = error.toLowerCase().split(' ')[0];
            const inputField = $(`#${fieldId}`);
            const errorMessage = $(`<div class="error-message text-danger">${error}</div>`);
            inputField.after(errorMessage);
        });
    }
    
});
