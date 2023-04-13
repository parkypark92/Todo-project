export { Project, projects, projectTabs };

const projects = [];
const projectTabs = [];
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
