export { Task, tasks, currentTasks, tasksComplete };
const tasks = [];
let currentTasks = [];
let tasksComplete = [];

const Task = (description, date, project, priority) => {
  return {
    description,
    date,
    project,
    priority,
    id: "",
    complete: false,
    setName: function (newName) {
      this.description = newName;
    },
    setDate: function (newDate) {
      this.date = newDate;
    },
    setProject: function (newProject) {
      this.project = newProject;
    },
    setPriority: function (newPriority) {
      this.priority = newPriority;
    },
  };
};

const testTask1 = Task("test", "2023-04-04", "none", "1-high");
tasks.push(testTask1);
const testTask2 = Task("test", "2023-04-04", "none", "2-medium");
tasks.push(testTask2);
const testTask3 = Task("test", "2023-04-04", "none", "3-low");
tasks.push(testTask3);
