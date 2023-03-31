import { format, addDays, startOfWeek, nextThursday } from "date-fns";
import { tasks, currentTasks, tasksComplete } from "./tasks";
import { projectHeadings } from "./projects";
import {
  taskDisplays,
  tasksToday,
  allTasks,
  tasksThisWeek,
  display,
  createTaskDisplay,
  createCompletedTaskDisplays,
  completedTasks,
} from "./dom";
export { activate, displayChecker, setPriorityColor, currentDate, currentWeek };

let currentDate = format(new Date(), "yyyy-MM-dd");

let currentWeek = function () {
  let firstDay = startOfWeek(Date.parse(currentDate), { weekStartsOn: 1 });
  let week = [firstDay];
  for (let i = 0; i < 6; i++) {
    let day = week[i];
    let nextDay = addDays(day, 1);
    week.push(nextDay);
  }
  const formattedWeek = week.map((elem) =>
    format(new Date(elem), "yyyy-MM-dd")
  );
  return formattedWeek;
};

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
  if (tasksThisWeek.classList.contains("active")) {
    getWeekTasks();
  }
  if (completedTasks.classList.contains("active")) {
    getCompletedTasks();
  }
}

function getAllTasks() {
  currentTasks.length = 0;
  for (let task of tasks) {
    currentTasks.push(task);
  }
  displayCurrentTasks();
}

function getTodaysTasks() {
  currentTasks.length = 0;
  for (let task of tasks) {
    if (task.date === currentDate) {
      currentTasks.push(task);
    }
  }
  displayCurrentTasks();
}

function getWeekTasks() {
  currentTasks.length = 0;
  const thisWeek = currentWeek();
  for (let task of tasks) {
    for (let i = 0; i < thisWeek.length; i++) {
      if (task.date === thisWeek[i]) {
        currentTasks.push(task);
      }
    }
  }
  displayCurrentTasks();
}

function getCompletedTasks() {
  currentTasks.length = 0;
  for (let task of tasksComplete) {
    currentTasks.push(task);
  }
  display.textContent = "";
  for (let task of currentTasks) {
    createCompletedTaskDisplays(task);
  }
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
