let tasks = require('../database/todoTask.json');
const { generateUID, writeDataToFile } = require('../ultis/index.js');
const { checkToken } = require('./usersModel.js');
const addNewTask = (data) => {
	const newTask = {
		id: generateUID(),
		name: data.name,
		user_id: data.user_id,
		completed: data.completed,
	};
	return new Promise((resolve, reject) => {
		const isTokenValid = checkToken(data.id, data.token);
		if (isTokenValid) {
			tasks.unshift(newTask);
			writeDataToFile('./database/todoTask.json', JSON.stringify(tasks));
			resolve(newTask);
		}
	});
};

const getAllTasksModel = (data) => {
	return new Promise((resolve, reject) => {
		resolve(tasks);
	});
};

const deleteTaskModel = (data) => {
	return new Promise((resolve, reject) => {
		const task = tasks.find((task) => task.id === data.id);
		if (task) {
			const isTokenValid = checkToken(task.user_id, data.token);
			if (isTokenValid) {
				const updatedlistTasks = tasks.filter((task) => task.id !== data.id);
				tasks = updatedlistTasks;
				writeDataToFile('./database/todoTask.json', JSON.stringify(tasks));
				const message = 'Delete success';
				resolve(message);
			}
		}
		resolve('Wrong token!');
	});
};

const deleteAllTasksModel = (data) => {
	return new Promise((resolve, reject) => {
		const isTokenValid = checkToken(data.user_id, data.token);
		if (isTokenValid) {
			const updatedlistTasks = tasks.filter(
				(task) => task.user_id !== data.user_id
			);
			tasks = updatedlistTasks;
			writeDataToFile('./database/todoTask.json', JSON.stringify(tasks));
			const message = 'Delete all tasks success';
			resolve(message);
		}
	});
};

const editTaskModel = async (data) => {
	return new Promise((resolve, reject) => {
		const task = tasks.find((task) => task.id === data.id);
		const isTokenValid = checkToken(task.user_id, data.token);
		if (isTokenValid) {
			task.name = data.name;
			writeDataToFile('./database/todoTask.json', JSON.stringify(tasks));
			const message = 'edit success';
			resolve(message);
		}
	});
};

const filterState = {
	DONE: 'done',
	UNDONE: 'undone',
	ALL: 'all',
};

const toggleTaskModel = async (data) => {
	return new Promise((resolve, reject) => {
		const task = tasks.find((task) => task.id === data.id);
		if (task) {
			const isTokenValid = checkToken(task.user_id, data.token);
			if (isTokenValid) {
				if (task.completed === filterState.UNDONE) {
					task.completed = filterState.DONE;
				} else {
					task.completed = filterState.UNDONE;
				}
				writeDataToFile('./database/todoTask.json', JSON.stringify(tasks));
				const message = 'toggle success';
				resolve(message);
			}
		}
	});
};

module.exports = {
	addNewTask,
	getAllTasksModel,
	deleteTaskModel,
	deleteAllTasksModel,
	editTaskModel,
	toggleTaskModel,
};
