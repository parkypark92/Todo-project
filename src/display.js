import { format } from "date-fns";
import { tasks, currentTasks } from "./tasks";
import { projectHeadings } from "./projects";
import {
  taskDisplays,
  tasksToday,
  allTasks,
  display,
  createTaskDisplay,
} from "./dom";
export { activate, displayChecker, setPriorityColor };

let currentDate = format(new Date(), "yyyy-MM-dd");

function activate() {
  deactivate();
  this.classList.add("active");
  displayChecker();
}

function deactivate() {
  for (let display of taskDisplays) {
    display.classList.remove("active");
  }
  for (let project of projectHeadings) {
    project.classList.remove("active");
  }
}

function displayChecker() {
  if (tasksToday.classList.contains("active")) {
    getTodaysTasks();
  }
  if (allTasks.classList.contains("active")) {
    getAllTasks();
  }
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

function displayCurrentTasks() {
  display.textContent = "";
  displayByPriority(currentTasks);
  const tasksByDate = groupByDate(currentTasks);
  const orderedDates = orderDates(tasksByDate);
  for (let key in orderedDates) {
    createDateHeader(key);
    for (let task of orderedDates[key]) {
      createTaskDisplay(task);
    }
  }
}

function displayByPriority(array) {
  array.sort((a, b) =>
    a.priority > b.priority ? 1 : a.priority < b.priority ? -1 : 0
  );
}

function groupByDate(array) {
  const groupArrayObject = array.reduce(
    (group, arr) => {
      const { date } = arr;

      group[date] = group[date] ?? [];

      group[date].push(arr);

      return group;
    },

    {}
  );
  return groupArrayObject;
}

function orderDates(obj) {
  return Object.keys(obj)
    .sort((a, b) => Date.parse(a) - Date.parse(b))
    .reduce(function (result, key) {
      result[key] = obj[key];
      return result;
    }, {});
}

function createDateHeader(date) {
  const dateHeader = document.createElement("h2");
  dateHeader.textContent = format(new Date(date), "EEE, dd MMM yyyy");
  display.appendChild(dateHeader);
}

function setPriorityColor(task, taskDiv) {
  if (task.priority === "1-high") {
    taskDiv.classList.add("high-priority");
  } else if (task.priority === "2-medium") {
    taskDiv.classList.add("medium-priority");
  } else if (task.priority === "3-low") {
    taskDiv.classList.add("low-priority");
  } else {
    return;
  }
}