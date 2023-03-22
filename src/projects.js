export { Project, projects, projectHeadings };

const projects = [];
const projectHeadings = [];
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
