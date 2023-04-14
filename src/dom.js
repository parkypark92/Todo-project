import { format } from "date-fns";
import binIcon from "./icons/bin.png";
import editIcon from "./icons/editing.png";
import completeIcon from "./icons/checked.png";
import { updateStorage } from "./storage";
import { Task, tasks, tasksComplete } from "./tasks";
import { Project, projects, projectTabs } from "./projects";
import {
  activate,
  displayChecker,
  setPriorityColor,
  currentDate,
  currentWeek,
  getAllTasks,
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
  mainHeading,
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
const mainHeading = document.querySelector(".main-heading");

allCounter.textContent = "0";
todayCounter.textContent = "0";
weekCounter.textContent = "0";
completeCounter.textContent = "0";

newTaskButton.addEventListener("click", () => displayInputWindow(taskInput));
addTaskButton.addEventListener("click", addNewTask);
cancelTaskButton.addEventListener("click", () =>
  exitInputWindow(taskInput, taskForm, inputError)
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
  let newTask = Task(
    taskDescription.value,
    taskDate.value,
    taskProject.value,
    taskPriority.value
  );
  tasks.push(newTask);
  newTask.id = tasks.indexOf(newTask);
  updateStorage("saved tasks", tasks);
  updateCounters();
  displayChecker();
  exitInputWindow(taskInput, taskForm, inputError);
}

function createTaskDisplay(task) {
  const taskDiv = createDiv("task-display", "", display);
  taskDiv.setAttribute("data-index", tasks.indexOf(task));
  const priorityColor = createDiv("priority-color", "", taskDiv);
  createDiv("task-description", task.description, taskDiv);
  const buttonDiv = createDiv("task-display-buttons", "", taskDiv);
  const completeButton = createIcon(completeIcon, buttonDiv);
  completeButton.setAttribute("data-index", tasks.indexOf(task));
  completeButton.addEventListener("click", setTaskComplete);
  const editButton = createIcon(editIcon, buttonDiv);
  editButton.setAttribute("data-index", tasks.indexOf(task));
  editButton.addEventListener("click", displayEditInput);
  const deleteButton = createIcon(binIcon, buttonDiv);
  deleteButton.setAttribute("data-index", tasks.indexOf(task));
  deleteButton.addEventListener("click", deleteTask);
  setPriorityColor(task, priorityColor);
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
  updateProjectCounters();
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

function updateProjectCounters() {
  for (let tab of projectTabs) {
    let counter = 0;
    for (let task of tasks) {
      let heading = tab.getElementsByTagName("h3");
      if (task.project === heading[0].textContent) {
        counter++;
      }
    }
    tab.lastChild.textContent = counter;
  }
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
cancelEdit.addEventListener("click", () =>
  exitInputWindow(editTask, editForm, editError)
);

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
  const taskDisplay = display.querySelector(
    `[data-index="${this.getAttribute("data-index")}"]`
  );
  taskDisplay.querySelector(".task-description").textContent =
    editDescription.value;
  updateStorage("saved tasks", tasks);
  updateCounters();
  displayChecker();
  exitInputWindow(editTask, editForm, editError);
}

function deleteTask(e) {
  const complete = tasks.splice(e.target.getAttribute("data-index"), 1);
  reassignIndex();
  updateStorage("saved tasks", tasks);
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
  updateStorage("completed tasks", tasksComplete);
  updateCounters();
}

// PROJECTS
const newProjectButton = document.querySelector("#new-project");
const projectInput = document.querySelector(".project-input");
const projectForm = document.querySelector("#project-form");
const projectName = document.querySelector("#project-name");
const addProjectButton = document.querySelector(".add-project");
const cancelProjectButton = document.querySelector(".cancel-project");
const projectError = document.querySelector(".project-error");
const projectsBreakdown = document.querySelector(".projects-breakdown");
const projectSelection = document.querySelector("#project-select");

newProjectButton.addEventListener("click", () =>
  displayInputWindow(projectInput)
);
cancelProjectButton.addEventListener("click", () =>
  exitInputWindow(projectInput, projectForm, projectError)
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

function displayProjects() {
  projectsBreakdown.textContent = "";
  projectTabs.length = 0;
  for (let project of projects) {
    addProjectToSidebar(project);
  }
}

function addProjectToSidebar(project) {
  const projectDiv = createDiv("project-tab-div", "", projectsBreakdown);
  const projectTab = createDiv("display-selector", "", projectDiv);
  projectTab.setAttribute("data-index", project.id);
  const removeProject = createDiv("remove-project", "-", projectDiv);
  removeProject.setAttribute("data-index", project.id);
  removeProject.addEventListener("click", deleteProject);
  const projectHeading = document.createElement("h3");
  projectHeading.textContent = project.name;
  projectTab.appendChild(projectHeading);
  const projectCounter = createDiv("counter", "0", projectTab);
  projectCounter.classList.add(`${project.name}`);
  projectTabs.push(projectTab);
  addClickEventToProject(projectTab);
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
  } else if (projectName.checkValidity() === false) {
    projectError.textContent = "Project names must be one word!";
    return;
  }
  for (let item of projects) {
    if (projectName.value.toUpperCase() === item.name.toUpperCase()) {
      projectError.textContent = "Project already exists!";
      return;
    }
  }
  const newProject = Project(projectName.value.toUpperCase());
  projects.push(newProject);
  newProject.id = projects.indexOf(newProject);
  updateStorage("saved projects", projects);
  displayProjects();
  updateProjectCounters();
  addProjectToSelection(newProject.name);
  exitInputWindow(projectInput, projectForm, projectError);
}

function deleteProject(e) {
  const removedTab = projectTabs.splice(e.target.getAttribute("data-index"), 1);
  if (removedTab[0].classList.contains("active")) {
    removedTab[0].classList.remove("active");
    allTasks.classList.add("active");
  }
  const removed = projects.splice(e.target.getAttribute("data-index"), 1);
  removeProjectFromSelection(removed);
  reassignProjectIndexes();
  updateStorage("saved projects", projects);
  displayProjects();
  updateProjectCounters();
  displayChecker();
}

function removeProjectFromSelection(toRemove) {
  for (let option of projectSelection.children) {
    if (option.value === toRemove[0].name) {
      option.remove();
    }
  }
  for (let option of editProject.children) {
    if (option.value === toRemove[0].name) {
      option.remove();
      setProjectSelections(option.value);
    }
  }
}

function setProjectSelections(projectToRemove) {
  for (let task of tasks) {
    if (task.project === projectToRemove) {
      task.project = "none";
    }
  }
}

function reassignProjectIndexes() {
  for (let project of projects) {
    project.id = projects.indexOf(project);
  }
  for (let tab of projectTabs) {
    tab.setAttribute("data-index", projectTabs.indexOf(tab));
  }
}

// DOM
function displayInputWindow(input) {
  input.classList.remove("hidden");
  mainWrapper.classList.add("blur");
}

function exitInputWindow(input, form, errorMessage) {
  input.classList.add("hidden");
  mainWrapper.classList.remove("blur");
  form.reset();
  errorMessage.textContent = "";
}

function createDiv(divClass, divContent, append) {
  const newDiv = document.createElement("div");
  newDiv.classList.add(divClass);
  newDiv.textContent = divContent;
  append.appendChild(newDiv);
  return newDiv;
}

// function createButton(buttonClass, content, append) {
//   const newButton = document.createElement("button");
//   newButton.setAttribute("type", "button");
//   newButton.textContent = content;
//   newButton.classList.add(buttonClass);
//   append.appendChild(newButton);
//   return newButton;
// }

function createIcon(icon, append) {
  const newIcon = new Image();
  newIcon.src = icon;
  newIcon.style.width = "25px";
  newIcon.classList.add("task-icon");
  append.appendChild(newIcon);
  return newIcon;
}

document.addEventListener("DOMContentLoaded", () => {
  getAllTasks();
  displayProjects();
  for (let project of projects) {
    addProjectToSelection(project.name);
  }
  updateCounters();
});
