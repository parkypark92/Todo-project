export { Task, tasks, currentTasks, tasksComplete };
const tasks =
  localStorage.getItem("saved tasks") === null
    ? []
    : JSON.parse(localStorage.getItem("saved tasks"));
let currentTasks = [];
let tasksComplete =
  localStorage.getItem("completed tasks") === null
    ? []
    : JSON.parse(localStorage.getItem("completed tasks"));

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

// const testTask1 = Task("test", "2023-04-04", "none", "1-high");
// tasks.push(testTask1);
// const testTask2 = Task("test", "2023-04-04", "none", "2-medium");
// tasks.push(testTask2);
// const testTask3 = Task("test", "2023-04-04", "none", "3-low");
// tasks.push(testTask3);
// const testTask4 = Task("test", "2023-04-04", "none", "1-high");
// tasks.push(testTask4);
// const testTask5 = Task("test", "2023-04-04", "none", "2-medium");
// tasks.push(testTask5);
// const testTask6 = Task("test", "2023-04-04", "none", "3-low");
// tasks.push(testTask6);
// const testTask7 = Task("test", "2023-04-04", "none", "1-high");
// tasks.push(testTask7);
// const testTask8 = Task("test", "2023-04-04", "none", "2-medium");
// tasks.push(testTask8);
// const testTask9 = Task("test", "2023-04-04", "none", "3-low");
// tasks.push(testTask9);
// const testTask10 = Task("test", "2023-04-04", "none", "3-low");
// tasks.push(testTask10);
// const testTask11 = Task("test", "2023-04-04", "none", "3-low");
// tasks.push(testTask11);
// const testTask12 = Task("test", "2023-04-04", "none", "3-low");
// tasks.push(testTask12);
