import { tasks } from ".";
import { createTaskDisplay, display } from "./dom";
export { displayTodaysTasks };

let currentDate = new Date().toJSON().slice(0, 10);

function displayTodaysTasks() {
  display.textContent = "";
  for (let task of tasks) {
    if (task.date === currentDate) {
      createTaskDisplay(task);
    }
  }
}
