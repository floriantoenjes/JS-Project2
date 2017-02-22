"use strict";

const pageSize = 10;

const $studentList = $(".student-list");
const $studentItems = $(".student-item");

const $page = $(".page");
const $pageHeader = $(".page-header");

// Create pagination for items to show
function createPagination($itemsToShow) {

    // Calculate how many pages are needed
    const pageCount = Math.ceil($itemsToShow.length / pageSize);

    // Create the pagination div
    const $div = $("<div class='pagination'></div>");
    const $ul = $("<ul></ul>");

    // Reset pagination
    $(".pagination").remove();
    $studentItems.hide();

    // Append the pagination elements
    $div.append($ul);
    $page.append($div);

    // Initially show the first ten students
    $itemsToShow.slice(0, 10).show();

    // Return if there are less items than the page size
    if ($itemsToShow.length <= pageSize) {
        return;
    }

    // Create the page links
    for (let i = 0; i < pageCount; i++) {

        // Create the page link
        const $li = $("<li></li>")
        const $a = $(`<a class="active" href="#">${i + 1}</a>`);

        // Map the page link's click event to show the current students
        $a.click(evt => {
            evt.preventDefault();

            const start = i * pageSize;
            const end = start + pageSize;

            $itemsToShow.hide();
            $itemsToShow.slice(start, end).show();
        });

        // Append the page link
        $li.append($a);
        $ul.append($li);
    }
}


// Create the search form
function createSearchForm() {
    const $div = $("<div class='student-search'></div>");
    const $input = $("<input placeholder='Search for students...'>");
    const $button = $("<button>Search</button>");

    // Append the search
    $div.append($input, $button);
    $pageHeader.append($div);

    $button.click(evt => {
        search($input.val());
    });
}

// Search the students for a given query string
function search(query) {

    // Filter student-items for the search term
    const $results = $( $studentItems.toArray().filter(studentItem => {
        return $(studentItem).find("h3").text().includes(query);
    }) );

    // Create a pagination for the results
    createPagination($results);

    // Create a message if no matches are found
    if ($results.length === 0) {
        $page.append($("<h3 class='no-matches'>No matches found.</h3>"));
    } else {
        $(".no-matches").remove();
    }
}

// Create pagtination and search
createPagination($studentItems);
createSearchForm();
