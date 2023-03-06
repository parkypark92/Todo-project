import "./main-style.css";
import "./dom";
export { createTask, tasks };

function createTask(description, date, priority, project) {
  return { description, date, priority, project };
}

const tasks = [];
