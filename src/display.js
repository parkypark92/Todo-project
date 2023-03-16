import { tasks, projects, currentTasks } from ".";
import { displayCurrentTasks, taskDisplays, tasksToday, allTasks } from "./dom";
export { getTodaysTasks, getAllTasks, activate, displayChecker };

let currentDate = new Date().toJSON().slice(0, 10);

function displayChecker() {
  if (tasksToday.classList.contains("active")) {
    getTodaysTasks();
  }
  if (allTasks.classList.contains("active")) {
    getAllTasks();
  }
}

function activate(e) {
  deactivate();
  e.target.classList.add("active");
}

function getTodaysTasks() {
  currentTasks.length = 0;
  for (let task of tasks) {
    if (task.date === currentDate) {
      currentTasks.push(task);
    }
    displayCurrentTasks();
  }
}

function getAllTasks() {
  currentTasks.length = 0;
  for (let task of tasks) {
    currentTasks.push(task);
  }
  displayCurrentTasks();
}

function deactivate() {
  for (let display of taskDisplays) {
    display.classList.remove("active");
  }
  for (let project of projects) {
    project.classList.remove("active");
  }
}
