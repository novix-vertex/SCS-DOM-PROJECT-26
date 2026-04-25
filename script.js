function openCards() {
    let items = document.querySelectorAll(".item");
    let item_details = document.querySelectorAll(".item-detail");
    let details_close = document.querySelectorAll(".close");
    items.forEach((elem) => {
        elem.addEventListener("click", () => {
            item_details[elem.id].style.display = "block";
        });
    });

    details_close.forEach((elem) => {
        elem.addEventListener("click", () => {
            item_details[elem.id].style.display = "none";
        });
    });
}
function addTask() {

}
function showTaskList() {
    const sum;
    <div class="task" id="0">
        <h2 class="task-title">Title 1</h2>
        <Button class="mark-complete-bt">Mark Complete</Button>
    </div>
}
openCards();