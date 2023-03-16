import { tasks, currentTasks, projects } from ".";
import Task from "./tasks";
import Project from "./projects";
import {
  activate,
  getTodaysTasks,
  getAllTasks,
  displayChecker,
} from "./display";
export { displayCurrentTasks, taskDisplays, tasksToday, allTasks };

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
const editTask = document.querySelector(".task-edit");
const editForm = document.querySelector("#task-edit-form");
const editDescription = document.querySelector("#edit-description");
const editDate = document.querySelector("#edit-date");
const editProject = document.querySelector("#edit-project-select");
const editPriority = document.querySelector("#edit-priority");
const confirmEdit = document.querySelector(".confirm-edit");
const cancelEdit = document.querySelector(".cancel-edit");
const tasksToday = document.querySelector("#tasks-today");
const tasksThisWeek = document.querySelector("#tasks-this-week");
const allTasks = document.querySelector("#all-tasks");
const completedTasks = document.querySelector("#completed-tasks");
const taskDisplays = [tasksToday, tasksThisWeek, allTasks, completedTasks];

newTaskButton.addEventListener("click", () => displayInputWindow(taskInput));
addTaskButton.addEventListener("click", addNewTask);
cancelTaskButton.addEventListener("click", () =>
  exitInputWindow(taskInput, taskForm)
);

function addNewTask() {
  let newTask = Task(
    taskDescription.value,
    taskDate.value,
    taskProject.value,
    taskPriority.value
  );
  tasks.push(newTask);
  newTask.id = tasks.indexOf(newTask);
  // createTaskDisplay(newTask);
  displayChecker();
  exitInputWindow(taskInput, taskForm);
}

function createTaskDisplay(task) {
  const taskDiv = createDiv("task-display", "", display);
  taskDiv.setAttribute("data-index", tasks.indexOf(task));
  createDiv("task-description", task.description, taskDiv);
  createDiv("task-date", task.date, taskDiv);
  createDiv("task-priority", task.priority, taskDiv);
  createDiv("task-project", task.project, taskDiv);
  const editButton = createButton("task-edit-button", "EDIT", taskDiv);
  editButton.setAttribute("data-index", tasks.indexOf(task));
  editButton.addEventListener("click", displayEditInput);
  const deleteButton = createButton("task-remove-button", "DELETE", taskDiv);
  deleteButton.setAttribute("data-index", tasks.indexOf(task));
  deleteButton.addEventListener("click", deleteTask);
}

tasksToday.addEventListener("click", (e) => {
  activate(e);
  getTodaysTasks();
});

allTasks.addEventListener("click", (e) => {
  activate(e);
  getAllTasks();
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

function editTaskValues() {
  tasks[this.getAttribute("data-index")].description = editDescription.value;
  tasks[this.getAttribute("data-index")].date = editDate.value;
  tasks[this.getAttribute("data-index")].project = editProject.value;
  tasks[this.getAttribute("data-index")].priority = editPriority.value;
  const taskDisplay = document.querySelector(
    `[data-index="${this.getAttribute("data-index")}"]`
  );
  taskDisplay.querySelector(".task-description").textContent =
    editDescription.value;
  taskDisplay.querySelector(".task-date").textContent = editDate.value;
  taskDisplay.querySelector(".task-priority").textContent = editPriority.value;
  taskDisplay.querySelector(".task-project").textContent = editProject.value;
  displayChecker();
  exitInputWindow(editTask, editForm);
}

function deleteTask(e) {
  tasks.splice(e.target.getAttribute("data-index"), 1);
  reassignIndex();
  displayChecker();
}

function reassignIndex() {
  for (let task of tasks) {
    task.id = tasks.indexOf(task);
  }
}

function displayCurrentTasks() {
  display.textContent = "";
  for (let task of currentTasks) {
    createTaskDisplay(task);
  }
}

// PROJECTS
const newProjectButton = document.querySelector("#new-project");
const projectInput = document.querySelector(".project-input");
const projectForm = document.querySelector(".project-form");
const projectName = document.querySelector("#project-name");
const addProjectButton = document.querySelector(".add-project");
const cancelProjectButton = document.querySelector(".cancel-project");
const projectsBreakdown = document.querySelector(".projects-breakdown");

newProjectButton.addEventListener("click", () =>
  displayInputWindow(projectInput)
);
cancelProjectButton.addEventListener("click", () =>
  exitInputWindow(projectInput, projectForm)
);
addProjectButton.addEventListener("click", addNewProject);

function addProjectToSidebar(name) {
  const projectHeading = document.createElement("h3");
  projectHeading.textContent = name.toUpperCase();
  projectsBreakdown.appendChild(projectHeading);
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
  const newProject = Project(projectName.value);
  projects.push(newProject);
  newProject.id = projects.indexOf(newProject);
  addProjectToSidebar(projectName.value);
  addProjectToSelection(projectName.value);
  exitInputWindow(projectInput, projectForm);
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
