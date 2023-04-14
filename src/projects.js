export { Project, projects, projectTabs };

const projects =
  localStorage.getItem("saved projects") === null
    ? []
    : JSON.parse(localStorage.getItem("saved projects"));
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
