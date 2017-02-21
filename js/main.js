"use strict";

const pageSize = 10;

const $studentList = $(".student-list");
const $studentItems = $(".student-item");

const $page = $(".page");
const $pageHeader = $(".page-header");

// Create pagination for items to show
function createPagination($itemsToShow) {
    const pageCount = Math.ceil($itemsToShow.length / pageSize);

    const $div = $("<div class='pagination'></div>");
    const $ul = $("<ul></ul>");

    $(".pagination").remove();
    $studentItems.hide();

    // Append the pagination elements
    $div.append($ul);
    $page.append($div);

    // Show the first ten students
    $itemsToShow.slice(0, 10).show();

    // Create the page links
    for (let i = 0; i < pageCount; i++) {
        // Create the page link
        const $li = $("<li></li>")
        const $a = $(`<a class="active" href="#">${i + 1}</a>`);

        $a.click(evt => {
            evt.preventDefault();
            const start = i * 10;
            const end = start + 10;

            $itemsToShow.hide();
            $itemsToShow.slice(start, end).show();
        });

        // Append the page link
        $li.append($a);
        $ul.append($li);
    }
}


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

function search(query) {
    // Filter student-items for the search term
    const $results = $($studentItems.toArray().filter(studentItem => {
        return $(studentItem).find("h3").text().includes(query);
    }));

    // Create a pagination for the results
    createPagination($results);

    // Create a message if no matches are found
    if ($results.length === 0) {
        $page.append($("<h3>No matches found.</h3>"));
    }
}

// Create pagtination and search
createPagination($studentItems);
createSearchForm();
