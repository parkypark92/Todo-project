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
