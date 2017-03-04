"use strict";

const pageSize = 10;

const $studentList = $(".student-list");
const $studentItems = $(".student-item");

const $page = $(".page");
const $pageHeader = $(".page-header");

function createPagination($itemsToShow) {

    const pageCount = Math.ceil($itemsToShow.length / pageSize);

    const $paginationDiv = $("<div class='pagination'></div>");
    const $paginationList = $("<ul></ul>");

    // Reset pagination
    $(".pagination").remove();
    $studentItems.hide();

    $paginationDiv.append($paginationList);
    $page.append($paginationDiv);

    // Initially show the first ten students
    $itemsToShow.slice(0, 10).show();

    if ($itemsToShow.length <= pageSize) {
        return;
    }

    // Create the page links
    for (let i = 0; i < pageCount; i++) {

        const $li = $("<li></li>")
        const $pageLink = $(`<a class="active" href="#">${i + 1}</a>`);

        // Map the page link's click event to show the current students
        $pageLink.click(evt => {
            evt.preventDefault();

            const start = i * pageSize;
            const end = start + pageSize;

            $itemsToShow.hide();
            $itemsToShow.slice(start, end).show();
        });

        $li.append($pageLink);
        $paginationList.append($li);
    }
}


function createSearchForm() {
    const $searchDiv = $("<div class='student-search'></div>");
    const $searchInput = $("<input placeholder='Search for students...'>");
    const $searchButton = $("<button>Search</button>");

    $searchDiv.append($searchInput, $searchButton);
    $pageHeader.append($searchDiv);

    $searchButton.click(evt => {
        search($searchInput.val());
    });
}

// Search the students for a given query string
function search(query) {

    // Filter student-items for the search term
    const $results = $( $studentItems.toArray().filter(studentItem => {
        return $(studentItem).find("h3").text().includes(query);
    }) );

    createPagination($results);

    // Create a message if no matches are found
    $(".no-matches").remove();
    if ($results.length === 0) {
        $page.append($("<h3 class='no-matches'>No matches found.</h3>"));
    }
}

createPagination($studentItems);
createSearchForm();
