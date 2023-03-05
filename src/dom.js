export {
  addTaskButton,
  addProjectButton,
  taskInput,
  addTask,
  displayTaskInput,
};

const header = document.querySelector("header");
const nav = document.querySelector("nav");
const main = document.querySelector("main");
const addTaskButton = document.querySelector("#add-task");
const addProjectButton = document.querySelector("#add-project");
const taskInput = document.querySelector(".task-input");

addTaskButton.addEventListener("click", addTask);

function addTask() {
  displayTaskInput();
}

function displayTaskInput() {
  taskInput.classList.remove("hidden");
  header.classList.add("blur");
  nav.classList.add("blur");
  main.classList.add("blur");
}
