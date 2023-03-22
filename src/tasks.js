export { Task, tasks, currentTasks };
const tasks = [];
let currentTasks = [];

const Task = (description, date, project, priority) => {
  return {
    description,
    date,
    project,
    priority,
    complete: false,
    id: "",
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
    setComplete: function (newValue) {
      this.complete = newValue;
    },
  };
};
