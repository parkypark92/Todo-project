import { format } from "date-fns";
import { Task, tasks, currentTasks, tasksComplete } from "./tasks";
import { Project, projects, projectHeadings } from "./projects";
import {
  activate,
  displayChecker,
  setPriorityColor,
  currentDate,
  currentWeek,
} from "./display";
export {
  createTaskDisplay,
  createCompletedTaskDisplays,
  taskDisplays,
  tasksToday,
  allTasks,
  tasksThisWeek,
  completedTasks,
  display,
};

const mainWrapper = document.querySelector(".main-wrapper");
const display = document.querySelector("main");

// TASKS
const newTaskButton = document.querySelector("#new-task");
const taskInput = document.querySelector(".task-input");
const taskForm = document.querySelector("#task-form");
const taskDescription = document.querySelector("#description");
const taskDate = document.querySelector("#date");
const taskPriority = document.querySelector("#priority");
const taskProject = document.querySelector("#project-select");
const addTaskButton = document.querySelector(".add-task");
const cancelTaskButton = document.querySelector(".cancel-task");
const inputError = document.querySelector(".input-error");
const editTask = document.querySelector(".task-edit");
const editForm = document.querySelector("#task-edit-form");
const editDescription = document.querySelector("#edit-description");
const editDate = document.querySelector("#edit-date");
const editProject = document.querySelector("#edit-project-select");
const editPriority = document.querySelector("#edit-priority");
const confirmEdit = document.querySelector(".confirm-edit");
const cancelEdit = document.querySelector(".cancel-edit");
const editError = document.querySelector(".edit-error");
const tasksToday = document.querySelector("#tasks-today");
const todayCounter = document.querySelector(".today");
const tasksThisWeek = document.querySelector("#tasks-this-week");
const weekCounter = document.querySelector(".this-week");
const allTasks = document.querySelector("#all-tasks");
const allCounter = document.querySelector(".all");
const completedTasks = document.querySelector("#completed-tasks");
const completeCounter = document.querySelector(".complete");
const taskDisplays = [tasksToday, tasksThisWeek, allTasks, completedTasks];

allCounter.textContent = "0";
todayCounter.textContent = "0";
weekCounter.textContent = "0";
completeCounter.textContent = "0";

newTaskButton.addEventListener("click", () => displayInputWindow(taskInput));
addTaskButton.addEventListener("click", addNewTask);
cancelTaskButton.addEventListener("click", () =>
  exitInputWindow(taskInput, taskForm)
);

function noInputValueMessage() {
  if (!taskDescription.value) {
    inputError.textContent = "Please enter description!";
  }
  if (!taskDate.value) {
    inputError.textContent = "Please enter date!";
  }
  if (!taskDescription.value && !taskDate.value) {
    inputError.textContent = "Please enter description and date!";
  }
}

function addNewTask() {
  if (!taskDate.value || !taskDescription.value) {
    noInputValueMessage();
    return;
  }
  inputError.textContent = "";
  let newTask = Task(
    taskDescription.value,
    taskDate.value,
    taskProject.value,
    taskPriority.value
  );
  tasks.push(newTask);
  newTask.id = tasks.indexOf(newTask);
  updateCounters();
  displayChecker();
  exitInputWindow(taskInput, taskForm);
}

function createTaskDisplay(task) {
  const taskDiv = createDiv("task-display", "", display);
  taskDiv.setAttribute("data-index", tasks.indexOf(task));
  createDiv("task-description", task.description, taskDiv);
  createDiv("task-date", format(new Date(task.date), "dd-MM-yyyy"), taskDiv);
  createDiv("task-priority", task.priority, taskDiv);
  createDiv("task-project", task.project, taskDiv);
  const completeButton = createButton("complete-button", "COMPLETE", taskDiv);
  completeButton.setAttribute("data-index", tasks.indexOf(task));
  completeButton.addEventListener("click", setTaskComplete);
  const editButton = createButton("task-edit-button", "EDIT", taskDiv);
  editButton.setAttribute("data-index", tasks.indexOf(task));
  editButton.addEventListener("click", displayEditInput);
  const deleteButton = createButton("task-remove-button", "DELETE", taskDiv);
  deleteButton.setAttribute("data-index", tasks.indexOf(task));
  deleteButton.addEventListener("click", deleteTask);
  setPriorityColor(task, taskDiv);
}

function createCompletedTaskDisplays(task) {
  const completeDiv = createDiv("complete-display", "", display);
  createDiv("complete-description", task.description, completeDiv);
  createDiv(
    "complete-date",
    `Completed on ${format(new Date(), "dd-MM-yyyy")}`,
    completeDiv
  );
}

function updateCounters() {
  updateAllCounter();
  updateTodayCounter();
  updateThisWeekCounter();
  updateCompleteCounter();
}

function updateAllCounter() {
  if (tasks.length === 0) {
    allCounter.textContent = "0";
  } else {
    allCounter.textContent = `${tasks.length}`;
  }
}

function updateTodayCounter() {
  let counter = 0;
  for (let task of tasks) {
    if (task.date === currentDate) {
      counter++;
    }
  }
  todayCounter.textContent = `${counter}`;
}

function updateThisWeekCounter() {
  let counter = 0;
  let week = currentWeek();
  for (let task of tasks) {
    for (let date of week) {
      if (task.date === date) {
        counter++;
      }
    }
  }
  weekCounter.textContent = `${counter}`;
}

function updateCompleteCounter() {
  completeCounter.textContent = tasksComplete.length;
}

tasksToday.addEventListener("click", (e) => {
  activate(e);
});
allTasks.addEventListener("click", (e) => {
  activate(e);
});
tasksThisWeek.addEventListener("click", (e) => {
  activate(e);
});
completedTasks.addEventListener("click", (e) => {
  activate(e);
});

// EDIT TASK
function displayEditInput() {
  displayInputWindow(editTask);
  editDescription.value = tasks[this.getAttribute("data-index")].description;
  editDate.value = tasks[this.getAttribute("data-index")].date;
  editPriority.value = tasks[this.getAttribute("data-index")].priority;
  editProject.value = tasks[this.getAttribute("data-index")].project;
  confirmEdit.setAttribute("data-index", this.getAttribute("data-index"));
}

confirmEdit.addEventListener("click", editTaskValues);
cancelEdit.addEventListener("click", () => exitInputWindow(editTask, editForm));

function noEditValueMessage() {
  if (!editDescription.value) {
    editError.textContent = "Please enter description!";
  }
  if (!editDate.value) {
    editError.textContent = "Please enter date!";
  }
  if (!editDescription.value && !editDate.value) {
    editError.textContent = "Please enter description and date!";
  }
}

function editTaskValues() {
  if (!editDescription.value || !editDate.value) {
    noEditValueMessage();
    return;
  }
  tasks[this.getAttribute("data-index")].description = editDescription.value;
  tasks[this.getAttribute("data-index")].date = editDate.value;
  tasks[this.getAttribute("data-index")].project = editProject.value;
  tasks[this.getAttribute("data-index")].priority = editPriority.value;
  console.log(currentTasks);
  const taskDisplay = document.querySelector(
    `[data-index="${this.getAttribute("data-index")}"]`
  );
  taskDisplay.querySelector(".task-description").textContent =
    editDescription.value;
  taskDisplay.querySelector(".task-date").textContent = editDate.value;
  taskDisplay.querySelector(".task-priority").textContent = editPriority.value;
  taskDisplay.querySelector(".task-project").textContent = editProject.value;
  updateCounters();
  displayChecker();
  exitInputWindow(editTask, editForm);
}

function deleteTask(e) {
  const complete = tasks.splice(e.target.getAttribute("data-index"), 1);
  reassignIndex();
  updateCounters();
  displayChecker();
  return complete;
}

function reassignIndex() {
  for (let task of tasks) {
    task.id = tasks.indexOf(task);
  }
}

function setTaskComplete(e) {
  const [taskDone] = deleteTask(e);
  taskDone.complete = true;
  tasksComplete.push(taskDone);
  updateCounters();
}

// PROJECTS
const newProjectButton = document.querySelector("#new-project");
const projectInput = document.querySelector(".project-input");
const projectForm = document.querySelector(".project-form");
const projectName = document.querySelector("#project-name");
const addProjectButton = document.querySelector(".add-project");
const cancelProjectButton = document.querySelector(".cancel-project");
const projectError = document.querySelector(".project-error");
const projectsBreakdown = document.querySelector(".projects-breakdown");

newProjectButton.addEventListener("click", () =>
  displayInputWindow(projectInput)
);
cancelProjectButton.addEventListener("click", () =>
  exitInputWindow(projectInput, projectForm)
);
addProjectButton.addEventListener("click", addNewProject);

function addClickEventToProject(projectTab) {
  projectTab.addEventListener("click", (e) => {
    activate(e);
  });
}

function noProjectInputMessage() {
  projectError.textContent = "Please enter a Project Name!";
}

function addProjectToSidebar(name) {
  const projectHeading = document.createElement("h3");
  projectHeading.textContent = name;
  projectsBreakdown.appendChild(projectHeading);
  projectHeadings.push(projectHeading);
  addClickEventToProject(projectHeading);
}

function addProjectToSelection(newOption) {
  const projectTaskOption = document.createElement("option");
  projectTaskOption.value = newOption;
  projectTaskOption.textContent = newOption;
  taskProject.appendChild(projectTaskOption);
  const projectEditOption = projectTaskOption.cloneNode(true);
  editProject.appendChild(projectEditOption);
}

function addNewProject() {
  if (!projectName.value) {
    noProjectInputMessage();
    return;
  }
  const newProject = Project(projectName.value.toUpperCase());
  projects.push(newProject);
  newProject.id = projects.indexOf(newProject);
  addProjectToSidebar(projectName.value.toUpperCase());
  addProjectToSelection(projectName.value.toUpperCase());
  exitInputWindow(projectInput, projectForm);
  console.log(projects);
}

// DOM
function displayInputWindow(input) {
  input.classList.remove("hidden");
  mainWrapper.classList.add("blur");
}

function exitInputWindow(input, form) {
  input.classList.add("hidden");
  mainWrapper.classList.remove("blur");
  form.reset();
  inputError.textContent = "";
  editError.textContent = "";
  projectError.textContent = "";
}

function createDiv(divClass, divContent, append) {
  const newDiv = document.createElement("div");
  newDiv.classList.add(divClass);
  newDiv.textContent = divContent;
  append.appendChild(newDiv);
  return newDiv;
}

function createButton(buttonClass, content, append) {
  const newButton = document.createElement("button");
  newButton.setAttribute("type", "button");
  newButton.textContent = content;
  newButton.classList.add(buttonClass);
  append.appendChild(newButton);
  return newButton;
}
