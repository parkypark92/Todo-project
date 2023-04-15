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
