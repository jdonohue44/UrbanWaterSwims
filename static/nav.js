// JARED DONOHUE (jjd2203)

$(document).ready(function() {
    let searchData = data["swim_races"]; 
    let autocompleteItems = [...new Set(
        searchData.flatMap(item => [
            item.title, 
            item.location_metro, 
            item.location_city_or_town, 
            item.location_beach, 
            item.date, 
            item.distance
        ]).filter(Boolean) // Remove empty values
    )];

    $("#search-input").autocomplete({
        source: autocompleteItems,
        select: function (event, ui) {
            $("#search-input").val(ui.item.value); 
            $(".d-flex[role='search']").submit();
        }
    });

    $('form[role="search"]').on('submit', function(event) {
        let searchInput = $('#search-input');
        let searchQuery = searchInput.val().trim();
        if (!searchQuery) {
            event.preventDefault();
            searchInput.val('');    
            searchInput.focus();    
        } else {
            searchInput.val(searchQuery);
        }
    });
});