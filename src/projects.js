export { Project, projects, projectHeadings, projectTabs };

const projects = [];
const projectHeadings = [];
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
