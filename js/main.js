"use strict";

const $page = $(".page");
const $div = $("<div class='pagination'></div>");
const $ul = $("<ul></ul>");

const $studentList = $(".student-list");
const $studentItems = $(".student-item");

const pageSize = 10;
const pageCount = Math.ceil($studentItems.length / pageSize);

$div.append($ul);
$page.append($div);

for (let i = 1; i <= pageCount; i++) {

    const $li = $(`<li><a class="active" href="#">${i}</a></li>`)


    $ul.append($li);

}

$studentItems.slice(10).hide();
