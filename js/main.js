"use strict";

const pageSize = 10;

const $studentList = $(".student-list");
const $studentItems = $(".student-item");

const $page = $(".page");
const $pageHeader = $(".page-header");

// Create the pagination elements
function createPagination($itemsToShow) {
    let pageCount = Math.ceil($itemsToShow.length / pageSize);

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
            let start = i * 10;
            let end = start + 10;

            $itemsToShow.hide();
            $itemsToShow.slice(start, end).show();
        });

        // Append the page link
        $li.append($a);
        $ul.append($li);

    }
}


function createSearch() {
    const $div = $("<div class='student-search'></div>");
    const $input = $("<input placeholder='Search for students...'>");
    const $button = $("<button>Search</button>");

    // Append the search
    $div.append($input, $button);
    $pageHeader.append($div);

    $button.click( evt => {
        // Get the search term
        const query = $input.val();

        // Filter items for the search term
        let $results = $($studentItems.toArray().filter(studentItem => {
            return $(studentItem).find("h3").text().includes(query);
        }));

        // Create a pagination for the results
        createPagination($results);
    });
}

// Create pagtination and search
createPagination($studentItems);
createSearch();
