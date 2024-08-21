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

const deleteTaskModel = (id) => {
	return new Promise((resolve, reject) => {
		const updatedlistTasks = tasks.filter((task) => task.id !== id);
		tasks = updatedlistTasks;
		writeDataToFile('./database/todoTask.json', JSON.stringify(tasks));
		const message = 'Delete success';
		resolve(message);
	});
};

const deleteAllTasksModel = (user_id) => {
	return new Promise((resolve, reject) => {
		const updatedlistTasks = tasks.filter((task) => task.user_id !== user_id);
		console.log(user_id);
		tasks = updatedlistTasks;
		writeDataToFile('./database/todoTask.json', JSON.stringify(tasks));
		const message = 'Delete all tasks success';
		resolve(updatedlistTasks);
	});
};

const editTaskModel = async (data) => {
	console.log(data);
	return new Promise((resolve, reject) => {
		const task = tasks.find((task) => task.id === data.id);
		task.name = data.name;
		writeDataToFile('./database/todoTask.json', JSON.stringify(tasks));
		const message = 'edit success';
		resolve(message);
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
		if (task.completed === filterState.UNDONE) {
			task.completed = filterState.DONE;
		} else {
			task.completed = filterState.UNDONE;
		}
		writeDataToFile('./database/todoTask.json', JSON.stringify(tasks));
		const message = 'toggle success';
		resolve(message);
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
