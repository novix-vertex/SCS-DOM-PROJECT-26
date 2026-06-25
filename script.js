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

function todoList() {
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
            "title": title.value.trim(),
            "description": desc.value.trim(),
            "isCompleted": false,
            "isImportant": isImportant.checked
        });
        title.value = "";
        desc.value = "";
        isImportant.checked = false;
        setTaskListFromLocalStorage(todolist);

        showTaskList();
        title.focus();
    }
    const todo_list_items = document.querySelector(".todo-list-items");
    function showTaskList() {
        getTaskListFromLocalStorage();
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
        setTaskListFromLocalStorage(todolist);
        showTaskList();
    }


    function getTaskListFromLocalStorage() {
        if (localStorage.getItem("tasklist")) {
            todolist = JSON.parse(localStorage.getItem("tasklist"));
            todo_list_items.style.justifyContent = "flex-start";
        }
        else {
            todo_list_items.style.justifyContent = "center";
            todo_list_items.style.color = "#fff";
            todo_list_items.innerHTML = "<h1>No task added yet</h1>";
        }
    }
    function setTaskListFromLocalStorage(tasklist) {
        localStorage.setItem("tasklist", JSON.stringify(tasklist));
    }

    window.onload = () => showTaskList();

}

todoList();

function dailyPlanner() {
    const start = 6;
    const end = 24;

    let daily_planner = [];

    for (let i = start; i < end; i++) {
        daily_planner.push(
            {
                "time": `${i}:00 - ${i + 1}:00`,
                "plan": ""
            }
        )
    }
    let daily_planner_container = document.querySelector(".daily-planner-container");


    function getDailyPlannerFromLocalStorage() {
        if (localStorage.getItem("dailyplanner")) {
            daily_planner = JSON.parse(localStorage.getItem("dailyplanner"));
        }
    }
    function setDailyPlannerToLocalStorage(dailyplanner) {
        localStorage.setItem("dailyplanner", JSON.stringify(dailyplanner));
    }

    getDailyPlannerFromLocalStorage();
    let sum = "";
    daily_planner.forEach((elem, idx) => {
        sum += `<div class="daily-planning-cell">
                    <p>${elem.time}</p>
                    <input type="text" name="daily-plan-text" id = ${idx} placeholder="..." value=${elem.plan}>
                </div>`;
    });

    daily_planner_container.innerHTML = sum;

    let daily_planner_cells = document.querySelectorAll(".daily-planning-cell input");

    daily_planner_cells.forEach((elem) => {
        elem.addEventListener("input", () => {
            console.log(elem.id, elem.value);
            daily_planner[elem.id].plan = elem.value;
            setDailyPlannerToLocalStorage(daily_planner);
            getDailyPlannerFromLocalStorage();
        });
    })

}

dailyPlanner();

function motivationalQuotes() {
    let quoteElem = document.querySelector('.quote-container .quote-card .quote');
    let authorElem = document.querySelector('.quote-container .quote-card .author');

    async function fetchQuote() {
        const response = await fetch("https://dummyjson.com/quotes/random");
        const { quote, author } = await response.json();
        quoteElem.innerHTML = quote;
        authorElem.innerHTML = "- " + author;
    }
    fetchQuote();


}
motivationalQuotes();

function pomodoroTimer() {
    const time = document.querySelector(".pomodoro-container .timer-container h2");
    const session = document.querySelector(".pomodoro-container .timer-container h4");

    const startBtn = document.querySelector(".pomodoro-container .action-btns .start-btn");
    const pauseBtn = document.querySelector(".pomodoro-container .action-btns .pause-btn");
    const resetBtn = document.querySelector(".pomodoro-container .action-btns .reset-btn");

    let timerInterval = null;
    let workSessionTime = 1800;
    let isWorkSession = true;
    let breakTime = 300;

    let minutes = Math.floor(workSessionTime / 60);
    let seconds = Math.floor(workSessionTime % 60);

    function updateTimer() {
        minutes = Math.floor(workSessionTime / 60);
        seconds = Math.floor(workSessionTime % 60);
        if (minutes == 0 && seconds == 0) {
            isWorkSession = !isWorkSession;
            clearInterval(timerInterval);
            minutes = Math.floor(workSessionTime / 60);
            seconds = Math.floor(workSessionTime % 60);
        } else {
            if (!isWorkSession) {
                workSessionTime = breakTime;

            }
        }
        updateUI();
    }

    function updateUI() {
        time.innerHTML = `${String(minutes).padStart("2", "0")}:${String(seconds).padStart("2", "0")}`
        session.innerHTML = isWorkSession ? "Work Session" : "Have a Break";
    }

    updateTimer();

    function startTimer() {
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            if (workSessionTime > 0) {
                workSessionTime--;

                updateTimer();
            }
        }, 10);
    }

    function pauseTimer() {
        clearInterval(timerInterval);
    }

    function resetTimer() {
        workSessionTime = 1800;
        clearInterval(timerInterval);
        updateTimer();
    }

    startBtn.addEventListener("click", startTimer);
    pauseBtn.addEventListener("click", pauseTimer);
    resetBtn.addEventListener("click", resetTimer);
}

pomodoroTimer();