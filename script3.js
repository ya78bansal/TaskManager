const modal = document.getElementById("task-modal");
const openModalBtn = document.getElementById("open-modal");
const cancelTaskBtn = document.getElementById("cancel-task");
const addTaskBtn = document.getElementById("add-task");

const menuItems = document.querySelectorAll(".menu-item");
const contentSections = document.querySelectorAll(".content-section");

let currentSection = "inbox";

// Modal control
openModalBtn.onclick = function() {
    modal.style.display = "block";
}

cancelTaskBtn.onclick = function() {
    modal.style.display = "none";
}


addTaskBtn.onclick = function() {
    const taskName = document.getElementById("task-name").value;
    const taskDesc = document.getElementById("task-desc").value;
    const taskDuedate = document.getElementById("task-duedate").value;
    const taskPriority = document.getElementById("task-priority").value;

    if (taskName) {
        addTask(taskName, taskDesc, currentSection, taskDuedate, taskPriority);
        document.getElementById("task-name").value = '';
        document.getElementById("task-desc").value = '';
        document.getElementById("task-duedate").value = '';
        document.getElementById("task-priority").value = '3'; // Reset to default priority (Medium)
        modal.style.display = "none";
    } else {
        alert("Task name is required!");
    }
}

function addTask(name, desc, section, dueDate, priority) {
    const taskItem = createTaskElement(name, desc, dueDate, priority);
    const taskList = document.getElementById(`tasks-list-${section}`);

    if (taskList) {
        taskList.appendChild(taskItem);
    }

    // Automatically move the task to the "All Task" section if the task was added to "Inbox"
    if (section === "inbox") {
        const allTaskList = document.querySelector('.kanban-column[data-status="All-Task"] .kanban-cards');
        if (allTaskList) {
            const truncatedDesc = desc.length > 5 ? desc.substring(0, 5) + "..." : desc;
            const allTaskItem = createTaskElementForAllTasks(name, truncatedDesc, priority);
            allTaskList.appendChild(allTaskItem);
        } else {
            console.error(`"All Task" section not found!`);
        }
    }
}

function createTaskElementForAllTasks(name, desc, priority) {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");
    taskItem.setAttribute("draggable", "true");
    taskItem.addEventListener("dragstart", handleDragStart);

    const taskTitle = document.createElement("h4");
    taskTitle.textContent = name;

    const taskDescription = document.createElement("p");
    taskDescription.textContent = desc;

    const priorityColor = getPriorityColor(priority);
    taskItem.style.borderLeftColor = priorityColor;

    // Add delete icon
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash");
    deleteIcon.classList.add("task-delete-icon");
    deleteIcon.addEventListener("click", function() {
        deleteTask(taskItem);
    });

    taskItem.appendChild(taskTitle);
    taskItem.appendChild(taskDescription);
    taskItem.appendChild(deleteIcon);

    return taskItem;
}

function createTaskElement(name, desc, dueDate, priority) {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");
    taskItem.setAttribute("draggable", "true");
    taskItem.addEventListener("dragstart", handleDragStart);

    const taskTitle = document.createElement("h4");
    taskTitle.textContent = name;

    const taskDescription = document.createElement("p");
    taskDescription.textContent = desc;

    const taskDueDate = document.createElement("p");
    taskDueDate.classList.add("task-due-date");
    taskDueDate.textContent = "Due Date: " + dueDate;

    const dueDateTime = new Date(dueDate + "T23:59:59");
    const currentTime = new Date();
    const timeDifference = dueDateTime - currentTime;

    if (timeDifference > 0) {
        const timer = document.createElement("span");
        timer.classList.add("task-timer");
        timer.textContent = formatTime(timeDifference);
        taskDueDate.appendChild(timer);
        updateTimer(timer, timeDifference);
    } else {
        taskDueDate.textContent = "Due Date: " + dueDate + " (Past Due)";
    }

    const taskPriorityElement = document.createElement("p");
    taskPriorityElement.classList.add("task-priority");
    taskPriorityElement.textContent = "Priority: " + getPriorityText(priority);

    const priorityColor = getPriorityColor(priority);
    taskItem.style.borderLeftColor = priorityColor;
    taskPriorityElement.style.color = priorityColor;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("task-delete");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function() {
        deleteTask(taskItem);
    });

    const editButton = document.createElement("button");
    editButton.classList.add("task-edit");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function() {
        editTask(taskItem, name, desc, dueDate, priority);
    });

    taskItem.appendChild(taskTitle);
    taskItem.appendChild(taskDescription);
    taskItem.appendChild(taskDueDate);
    taskItem.appendChild(taskPriorityElement);
    taskItem.appendChild(deleteButton);
    taskItem.appendChild(editButton);

    return taskItem;
}




function createTaskElement(name, desc, dueDate, priority) {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");
    taskItem.setAttribute("draggable", "true");
    taskItem.addEventListener("dragstart", handleDragStart);

    const taskTitle = document.createElement("h4");
    taskTitle.textContent = name;

    const taskDescription = document.createElement("p");
    taskDescription.textContent = desc;

    const taskDueDate = document.createElement("p");
    taskDueDate.classList.add("task-due-date");
    taskDueDate.textContent = "Due Date: " + dueDate;

    const dueDateTime = new Date(dueDate + "T23:59:59");
    const currentTime = new Date();
    const timeDifference = dueDateTime - currentTime;

    if (timeDifference > 0) {
        const timer = document.createElement("span");
        timer.classList.add("task-timer");
        timer.textContent = formatTime(timeDifference);
        taskDueDate.appendChild(timer);
        updateTimer(timer, timeDifference);
    } else {
        taskDueDate.textContent = "Due Date: " + dueDate + " (Past Due)";
    }

    const taskPriorityElement = document.createElement("p");
    taskPriorityElement.classList.add("task-priority");
    taskPriorityElement.textContent = "Priority: " + getPriorityText(priority);

    const priorityColor = getPriorityColor(priority);
    taskItem.style.borderLeftColor = priorityColor;
    taskPriorityElement.style.color = priorityColor;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("task-delete");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function() {
        deleteTask(taskItem);
    });

    const editButton = document.createElement("button");
    editButton.classList.add("task-edit");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function() {
        editTask(taskItem, name, desc, dueDate, priority);
    });

    taskItem.appendChild(taskTitle);
    taskItem.appendChild(taskDescription);
    taskItem.appendChild(taskDueDate);
    taskItem.appendChild(taskPriorityElement);
    taskItem.appendChild(deleteButton);
    taskItem.appendChild(editButton);

    return taskItem;
}

function deleteTask(taskItem) {
    taskItem.parentNode.removeChild(taskItem);
}

function editTask(taskItem, name, desc, dueDate, priority) {
    document.getElementById("task-name").value = name;
    document.getElementById("task-desc").value = desc;
    document.getElementById("task-duedate").value = dueDate;
    document.getElementById("task-priority").value = priority;

    modal.style.display = "block";

    addTaskBtn.textContent = "Save";
    addTaskBtn.onclick = function() {
        const newName = document.getElementById("task-name").value;
        const newDesc = document.getElementById("task-desc").value;
        const newDuedate = document.getElementById("task-duedate").value;
        const newPriority = document.getElementById("task-priority").value;

        if (newName) {
            taskItem.querySelector("h4").textContent = newName;
            taskItem.querySelector("p:nth-of-type(1)").textContent = newDesc;
            taskItem.querySelector(".task-due-date").textContent = "Due Date: " + newDuedate;
            taskItem.querySelector(".task-priority").textContent = "Priority: " + getPriorityText(newPriority);

            const priorityColor = getPriorityColor(newPriority);
            taskItem.style.borderLeftColor = priorityColor;
            taskItem.querySelector(".task-priority").style.color = priorityColor;

            modal.style.display = "none";
            addTaskBtn.textContent = "Add Task";
            addTaskBtn.onclick = function() {
                const taskName = document.getElementById("task-name").value;
                const taskDesc = document.getElementById("task-desc").value;
                const taskDuedate = document.getElementById("task-duedate").value;
                const taskPriority = document.getElementById("task-priority").value;

                if (taskName) {
                    addTask(taskName, taskDesc, currentSection, taskDuedate, taskPriority);
                    document.getElementById("task-name").value = '';
                    document.getElementById("task-desc").value = '';
                    document.getElementById("task-duedate").value = '';
                    document.getElementById("task-priority").value = '3';
                    modal.style.display = "none";
                } else {
                    alert("Task name is required!");
                }
            };
        } else {
            alert("Task name is required!");
        }
    };
}

function formatTime(ms) {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
}

function updateTimer(timerElement, timeDifference) {
    setInterval(() => {
        timeDifference -= 1000;
        if (timeDifference < 0) {
            timerElement.textContent = "Time's up!";
            clearInterval(this);
        } else {
            timerElement.textContent = formatTime(timeDifference);
        }
    }, 1000);
}

function getPriorityText(priority) {
    switch (parseInt(priority, 10)) {
        case 5:
            return 'Very High';
        case 4:
            return 'High';
        case 3:
            return 'Medium';
        case 2:
            return 'Low';
        case 1:
            return 'Very Low';
        default:
            return 'Medium';
    }
}

function getPriorityColor(priority) {
    switch (priority) {
        case "5":
            return "#f33f39"; // Very High
        case "4":
            return "#f58d42"; // High
        case "3":
            return "#fbeb08"; // Medium
        case "2":
            return "#7db77d"; // Low
        case "1":
            return "#86bcec"; // Very Low
        default:
            return "#ccc"; // Default color if priority is not recognized
    }
}

// Drag and Drop functionality
function handleDragStart(e) {
    e.dataTransfer.setData("text/html", e.target.textContent); // Store the full HTML
    e.dataTransfer.setData("text/section", e.target.closest(".kanban-cards").getAttribute("data-section")); // Store the section
    e.target.classList.add("dragging");
}

function handleDragOver(e) {
    e.preventDefault(); // Allow the drop
}

function handleDrop(e) {
    e.preventDefault();
    const taskHtml = e.dataTransfer.getData("text/html");
    const sourceSection = e.dataTransfer.getData("text/section");
    const targetColumn = e.target.closest(".kanban-cards");

    if (targetColumn) {
        const taskItem = document.createElement("div");
        taskItem.innerHTML = taskHtml;
        taskItem.classList.remove("dragging");
        taskItem.querySelector(".task-item").classList.remove("dragging");

        targetColumn.appendChild(taskItem);

        // Remove the original task item
        const originalItem = document.querySelector(".task-item.dragging");
        if (originalItem) {
            originalItem.remove();
        }
    }
}

const columns = document.querySelectorAll('.kanban-column .kanban-cards');
columns.forEach(column => {
    column.addEventListener("dragover", handleDragOver);
    column.addEventListener("drop", handleDrop);
});

// Theme Toggle Feature
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const modeText = document.getElementById('mode-text');

let isDarkMode = false;

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');

    isDarkMode = !isDarkMode;
    if (isDarkMode) {
        themeIcon.innerHTML = '<i class="fas fa-moon"></i>';
        modeText.textContent = 'Nightmode';
        themeToggleBtn.classList.add('dark');
    } else {
        themeIcon.innerHTML = '<i class="fas fa-sun"></i>';
        modeText.textContent = 'Daymode';
        themeToggleBtn.classList.remove('dark');
    }
});

// Navigation control
menuItems.forEach(item => {
    item.addEventListener("click", function() {
        menuItems.forEach(menu => menu.classList.remove("active"));
        item.classList.add("active");

        contentSections.forEach(section => section.classList.remove("active"));
        
        currentSection = item.getAttribute("data-section");
        document.getElementById(currentSection).classList.add("active");
        toggleAddTaskButton();
    });
});

function toggleAddTaskButton() {
    const addTaskBtn = document.getElementById("open-modal");
    if (currentSection === "filters-labels") {
        addTaskBtn.style.display = "none";
    } else {
        addTaskBtn.style.display = "block";
    }
}

// Initial setup: add event listeners and perform initial setup
document.querySelectorAll('.kanban-column .kanban-cards').forEach(column => {
    column.addEventListener("dragover", handleDragOver);
    column.addEventListener("drop", handleDrop);
});
    