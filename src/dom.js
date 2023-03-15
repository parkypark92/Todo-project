import { tasks, projects } from ".";
import Task from "./tasks";
import Project from "./projects";

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
  displayNewTask(newTask);
  exitInputWindow(taskInput, taskForm);
}

function displayNewTask(task) {
  const taskDiv = createDiv("task-display", "", display);
  taskDiv.setAttribute("data-index", tasks.indexOf(task));
  createDiv("task-description", task.description, taskDiv);
  createDiv("task-date", task.date, taskDiv);
  createDiv("task-priority", task.priority, taskDiv);
  createDiv("task-project", task.project, taskDiv);
  const editButton = createButton("task-edit-button", "EDIT", taskDiv);
  editButton.setAttribute("data-index", tasks.indexOf(task));
  editButton.addEventListener("click", displayEditInput);
  createButton("task-remove-button", "DELETE", taskDiv);
}

function displayEditInput() {
  displayInputWindow(editTask);
  editDescription.value = tasks[this.getAttribute("data-index")].description;
  editDate.value = tasks[this.getAttribute("data-index")].date;
  editPriority.value = tasks[this.getAttribute("data-index")].priority;
  editProject.value = tasks[this.getAttribute("data-index")].project;
  confirmEdit.setAttribute("data-index", this.getAttribute("data-index"));
}

confirmEdit.addEventListener("click", editTaskValues);

function editTaskValues() {
  tasks[this.getAttribute("data-index")].description = editDescription.value;
  tasks[this.getAttribute("data-index")].date = editDate.value;
  tasks[this.getAttribute("data-index")].project = editProject.value;
  tasks[this.getAttribute("data-index")].priority = editPriority.value;
  const taskDisplay = document.querySelector(
    `[data-index="${this.getAttribute("data-index")}"]`
  );
  const newDescription = taskDisplay.querySelector(".task-description");
  newDescription.textContent = editDescription.value;
  const newDate = taskDisplay.querySelector(".task-date");
  newDate.textContent = editDate.value;
  const newPriority = taskDisplay.querySelector(".task-priority");
  newPriority.textContent = editPriority.value;
  const newProject = taskDisplay.querySelector(".task-project");
  newProject.textContent = editProject.value;
  exitInputWindow(editTask, editForm);
}

// PROJECTS
const newProjectButton = document.querySelector("#new-project");
const projectInput = document.querySelector(".project-input");
const projectForm = document.querySelector(".project-form");
const projectName = document.querySelector("#project-name");
const addProjectButton = document.querySelector(".add-project");
const cancelProjectButton = document.querySelector(".cancel-project");
const projectsBreakdown = document.querySelector(".projects-breakdown");
const allProjects = document.querySelector("#all-projects");

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
  const projectOption = document.createElement("option");
  projectOption.value = newOption;
  projectOption.textContent = newOption;
  taskProject.appendChild(projectOption);
  editProject.appendChild(projectOption);
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
