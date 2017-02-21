"use strict";

const $studentList = $(".student-list");
const $studentItems = $(".student-item");

const pageSize = 10;
const $page = $(".page");
const $pageHeader = $(".page-header");

// Create the pagination elements
function createPagination($items, $allItems, $element) {
    let pageCount = Math.ceil($items.length / pageSize);

    $(".pagination").remove();
    $allItems.hide();

    const $div = $("<div class='pagination'></div>");
    const $ul = $("<ul></ul>");

    // Append the pagination elements
    $div.append($ul);
    $element.append($div);

    // Show the first ten students
    $items.slice(0, 10).show();

    // Create the page links
    for (let i = 0; i < pageCount; i++) {

        // Create the page link
        const $li = $("<li></li>")
        const $a = $(`<a class="active" href="#">${i + 1}</a>`);

        $a.click(evt => {
            evt.preventDefault();
            let start = i * 10;
            let end = start + 10;

            $items.hide();
            $items.slice(start, end).show();
        });

        // Append the page link
        $li.append($a);
        $ul.append($li);

    }
}

function createSearch($items, $element) {
    const $div = $("<div class='student-search'></div>");
    const $input = $("<input placeholder='Search for students...'>");
    const $button = $("<button>Search</button>");

    // Append the search
    $div.append($input, $button);
    $element.append($div);

    $button.click( evt => {
        const query = $input.val();
        let $results = $($studentItems.toArray().filter(studentItem => {
            return $(studentItem).find("h3").text().includes(query);
        }));
        console.log($results);
        createPagination($results, $items, $page);
    });
}

// Create pagtination and search
createPagination($studentItems, $studentItems, $page);
createSearch($studentItems, $pageHeader);
