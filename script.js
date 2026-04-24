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
openCards();