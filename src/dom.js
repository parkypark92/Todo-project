import { createTask, tasks } from ".";

const mainWrapper = document.querySelector(".main-wrapper");
const display = document.querySelector("main");
const newTask = document.querySelector("#new-task");
const newProject = document.querySelector("#new-project");
const taskInput = document.querySelector(".task-input");
const form = document.querySelector("#task-form");
const taskDescription = document.querySelector("#description");
const taskDate = document.querySelector("#date");
const taskPriority = document.querySelector("#priority");
const taskProject = document.querySelector("#project-select");
const addTaskButton = document.querySelector(".add-task");
const cancelTaskButton = document.querySelector(".cancel-task");

newTask.addEventListener("click", displayTaskInput);
addTaskButton.addEventListener("click", addNewTask);
cancelTaskButton.addEventListener("click", cancelNewTask);

function displayTaskInput() {
  taskInput.classList.remove("hidden");
  mainWrapper.classList.add("blur");
}

function cancelNewTask() {
  taskInput.classList.add("hidden");
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
  cancelNewTask();
}

function createDiv(divClass, divContent, append) {
  const newDiv = document.createElement("div");
  newDiv.classList.add(divClass);
  newDiv.textContent = divContent;
  append.appendChild(newDiv);
  return newDiv;
}

function displayNewTask(task) {
  const taskDiv = createDiv("task-display", "", display);
  createDiv("task-description", task.description, taskDiv);
  createDiv("task-date", task.date, taskDiv);
  createDiv("task-priority", task.priority, taskDiv);
  createDiv("task-project", task.project, taskDiv);
}
