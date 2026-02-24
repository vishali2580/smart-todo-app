let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        if (currentFilter === "completed") return task.completed;
        if (currentFilter === "pending") return !task.completed;
        return true;
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";

        li.innerHTML = `
            <span onclick="toggleComplete(${index})">${task.text}</span>
            <button onclick="deleteTask(${index})">X</button>
        `;

        taskList.appendChild(li);
    });

    updateCount();
}

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (text === "") return;

    tasks.push({ text: text, completed: false });
    input.value = "";
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function filterTasks(filter) {
    currentFilter = filter;
    renderTasks();
}

function updateCount() {
    document.getElementById("taskCount").innerText =
        `${tasks.length} Tasks`;
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

renderTasks();