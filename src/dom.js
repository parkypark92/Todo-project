import { createTask, tasks } from ".";

const mainWrapper = document.querySelector(".main-wrapper");
const display = document.querySelector("main");
const newTask = document.querySelector("#new-task");
const taskInput = document.querySelector(".task-input");
const taskForm = document.querySelector("#task-form");
const taskDescription = document.querySelector("#description");
const taskDate = document.querySelector("#date");
const taskPriority = document.querySelector("#priority");
const taskProject = document.querySelector("#project-select");
const addTaskButton = document.querySelector(".add-task");
const cancelTaskButton = document.querySelector(".cancel-task");
const newProject = document.querySelector("#new-project");
const projectInput = document.querySelector(".project-input");
const projectForm = document.querySelector(".project-form");
const projectName = document.querySelector("#project-name");
const addProjectButton = document.querySelector(".add-project");
const cancelProjectButton = document.querySelector(".cancel-project");
const projectsBreakdown = document.querySelector(".projects-breakdown");

newTask.addEventListener("click", displayTaskInput);
addTaskButton.addEventListener("click", addNewTask);
cancelTaskButton.addEventListener("click", exit.bind(taskInput, taskForm));
newProject.addEventListener("click", displayProjectInput);
cancelProjectButton.addEventListener(
  "click",
  exit.bind(projectInput, projectForm)
);
addProjectButton.addEventListener("click", addNewProject);

function displayTaskInput() {
  taskInput.classList.remove("hidden");
  mainWrapper.classList.add("blur");
}

function exit(form) {
  this.classList.add("hidden");
  mainWrapper.classList.remove("blur");
  form.reset();
}

function addNewTask() {
  let newTask = createTask(
    taskDescription.value,
    taskDate.value,
    taskPriority.value,
    taskProject.value
  );
  tasks.push(newTask);
  displayNewTask(newTask);
  exit.bind(taskInput, taskForm)();
}

function displayNewTask(task) {
  const taskDiv = createDiv("task-display", "", display);
  createDiv("task-description", task.description, taskDiv);
  createDiv("task-date", task.date, taskDiv);
  createDiv("task-priority", task.priority, taskDiv);
  createDiv("task-project", task.project, taskDiv);
  createButton("task-edit-button", "EDIT", taskDiv);
  createButton("task-remove-button", "DELETE", taskDiv);
}

function displayProjectInput() {
  projectInput.classList.remove("hidden");
  mainWrapper.classList.add("blur");
}

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
}

function addNewProject() {
  addProjectToSidebar(projectName.value);
  addProjectToSelection(projectName.value);
  exit.bind(projectInput, projectForm)();
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
}
