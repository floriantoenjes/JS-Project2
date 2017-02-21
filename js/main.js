"use strict";

const $studentList = $(".student-list");
const $studentItems = $(".student-item");

const pageSize = 10;
const pageCount = Math.ceil($studentItems.length / pageSize);

const $page = $(".page");

// Create the pagination elements
function createPagination($element) {
    const $div = $("<div class='pagination'></div>");
    const $ul = $("<ul></ul>");

    // Append the pagination elements
    $div.append($ul);
    $element.append($div);

    // Show the first ten students
    $studentItems.slice(10).hide();

    // Create the page links
    for (let i = 0; i < pageCount; i++) {

        // Create the page link
        const $li = $("<li></li>")
        const $a = $(`<a class="active" href="#">${i + 1}</a>`);

        $a.click(evt => {
            evt.preventDefault();
            let start = i * 10;
            let end = start + 10;

            $studentItems.hide();
            $studentItems.slice(start, end).show();
        });

        // Append the page link
        $li.append($a);
        $ul.append($li);

    }
}

function createSearch($element) {
    const $div = $("<div class='student-search'></div>");
    const $input = $("<input placeholder='Search for students...'>");
    const $button = $("<button>Search</button>");

    $button.click(evt => {
        evt.preventDefault();
        let query = $input.val();
        console.log(query);

        let results = $studentItems.toArray().filter(studentItem => {
            console.log(studentItem);
            let $studentItem = $(studentItem);

            console.log($studentItem.find("h3").text());
            return $studentItem.find("h3").text().includes(query);
        });
        console.log(results);

        $studentItems.hide();
        $(results).show();

    });

    // Append the search
    $div.append($input, $button);
    $element.append($div);
}

createPagination($page);
createSearch($(".page-header"));
