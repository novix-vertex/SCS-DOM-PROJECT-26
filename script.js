todolist = [];

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


const form = document.querySelector("form");
form.addEventListener("submit", (e, idx) => {
    e.preventDefault();
    const title = document.querySelector("#todo-title");
    const desc = document.querySelector("#todo-desc");
    const isImportant = document.querySelector("#todo-isimp");
    addTask(title, desc, isImportant);
});
function addTask(title, desc, isImportant) {
    todolist.push({
        "title": title.value,
        "description": desc.value,
        "isCompleted": false,
        "isImportant": isImportant.checked
    });
    title.value = "";
    desc.value = "";
    isImportant.checked = false;

    showTaskList();
    title.focus();
}
const todo_list_items = document.querySelector(".todo-list-items");
function showTaskList() {
    let sum = '';
    todolist.forEach((todo, idx) => {
        sum += `<div class="task" id=${idx}>
                    <div class="task-info">
                        <h2 class="task-title">${todo.title}</h2>
                        ${todo.isImportant ? `<span id=${idx} class="task-imp">Imp</span>` : ``}
                    </div>
                    ${todo.isCompleted ? `<button id=${idx} class="completed-bt">Completed</button>` : `<button id=${idx} class="mark-complete-bt">Mark Complete</button>`}
               </div>`;
        todo_list_items.innerHTML = sum;
    });
}

todo_list_items.addEventListener("click", (e) => {
    if (e.target.classList.contains("mark-complete-bt")) {
        markCompleted(e.target.id);
    }
});


function markCompleted(idx) {
    todolist[idx].isCompleted = true;
    showTaskList();
}

