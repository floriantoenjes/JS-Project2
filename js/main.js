"use strict";

const $studentList = $(".student-list");
const $studentItems = $(".student-item");

const pageSize = 10;
const pageCount = Math.ceil($studentItems.length / pageSize);

// Create the pagination elements
const $page = $(".page");
const $div = $("<div class='pagination'></div>");
const $ul = $("<ul></ul>");

// Append the pagination elements
$div.append($ul);
$page.append($div);

// Show the first ten students
$studentItems.slice(10).hide();


// Create the page links
for (let i = 0; i < pageCount; i++) {

    // Create a page link
    const $li = $("<li></li>")
    const $a = $(`<a class="active" href="#">${i + 1}</a>`);

    $a.click(function(evt) {
        evt.preventDefault();
        let start = i * 10;
        let end = start + 10;

        $studentItems.hide();
        $studentItems.slice(start, end).show();
    });

    // Append a page link
    $li.append($a);
    $ul.append($li);

}

