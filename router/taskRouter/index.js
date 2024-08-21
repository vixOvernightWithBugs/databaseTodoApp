var routerMethods = require('../methods.js');

var routes = require('../routes.js');
const {
	addTask,
	getAllTasks,
	deleteTask,
	editTask,
	toggleTask,
	deleteAllTasks,
} = require('../../controller/tasks/index.js');
var taskRouter = {
	run(req, res) {
		routerMethods.get(req, res, routes.task.value, getAllTasks);
		routerMethods.post(req, res, routes.task.value, addTask);
		routerMethods.delete(req, res, routes.task.value, deleteTask);
		routerMethods.delete(
			req,
			res,
			routes.task.deleteAllTasks.value,
			deleteAllTasks
		);
		routerMethods.put(req, res, routes.task.value, editTask);
		routerMethods.put(req, res, routes.task.toggleTask.value, toggleTask);
	},
};
module.exports = taskRouter;
