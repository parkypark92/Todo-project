export { Project as default };
const Project = (name) => {
  return {
    name,
    id: "",
    tasks: [],
    setName: function (newName) {
      this.name = newName;
    },
    setTasks: function (tasks) {
      this.tasks = tasks;
    },
  };
};
