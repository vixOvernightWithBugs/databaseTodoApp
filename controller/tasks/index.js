const {
	addNewTask,
	getAllTasksModel,
	deleteTaskModel,
	deleteAllTasksModel,
	editTaskModel,
	toggleTaskModel,
} = require('../../model/taskModel.js');
const { getDataFromRequest } = require('../../ultis/index.js');
const { httpStatusCode } = require('../../constants.js');

// const fixPreflight = (req,res) => {
//   res.end()
// }

const addTask = async (request, response) => {
	const token = request.headers['authorization'];
	if (!token) {
		response.writeHead(httpStatusCode.ERROR, {
			'Content-Type': 'application/json',
		});
		response.end(JSON.stringify({ message: 'NO TOKENNNNNN' }));
	}
	const body = await getDataFromRequest(request);
	if (!body) {
		response.writeHead(httpStatusCode.ERROR, {
			'Content-Type': 'application/json',
		});
		response.end(JSON.stringify({ message: 'No Data received to add task' }));
	} else {
		let data = {
			...body,
			token: token,
		};
		const message = await addNewTask(data);
		response.writeHead(httpStatusCode.OK, {
			'Content-Type': 'application/json',
		});
		response.end(JSON.stringify(message));
	}
};

const getAllTasks = async (request, response) => {
	const token = request.headers['authorization'];
	if (!token) {
		response.writeHead(httpStatusCode.OK, {
			'Content-Type': 'application/json',
		});
		response.end(
			JSON.stringify({
				message: 'NO TOKENNNNNN',
			})
		);
	}
	const tasks = await getAllTasksModel();
	response.writeHead(httpStatusCode.OK, {
		'Content-Type': 'application/json',
	});
	response.end(JSON.stringify(tasks));
};

const deleteTask = async (request, response) => {
	const token = request.headers['authorization'];
	if (token) {
		const body = await getDataFromRequest(request);
		if (!body) {
			response.writeHead(httpStatusCode.ERROR, {
				'Content-Type': 'application/json',
			});
			response.end(
				JSON.stringify({ message: 'No Data received to delete task' })
			);
		} else {
			let data = {
				id: body,
				token: token,
			};
			const message = await deleteTaskModel(data);
			response.writeHead(httpStatusCode.OK, {
				'Content-Type': 'application/json',
			});
			response.end(JSON.stringify(message));
		}
	} else {
		response.writeHead(httpStatusCode.OK, {
			'Content-Type': 'application/json',
		});
		response.end(
			JSON.stringify({
				message: 'NO TOKENNNNNN',
			})
		);
	}
};

const deleteAllTasks = async (request, response) => {
	const token = request.headers['authorization'];
	if (token) {
		const body = await getDataFromRequest(request);
		if (!body) {
			response.writeHead(httpStatusCode.ERROR, {
				'Content-Type': 'application/json',
			});
			response.end(
				JSON.stringify({ message: 'No Data received to delete task' })
			);
		} else {
			let data = {
				user_id: body,
				token: token,
			};
			const message = await deleteAllTasksModel(data);
			response.writeHead(httpStatusCode.OK, {
				'Content-Type': 'application/json',
			});
			response.end(JSON.stringify(message));
		}
	} else {
		response.writeHead(httpStatusCode.OK, {
			'Content-Type': 'application/json',
		});
		response.end(
			JSON.stringify({
				message: 'NO TOKENNNNNN',
			})
		);
	}
};

const editTask = async (request, response) => {
	const token = request.headers['authorization'];
	if (token) {
		const body = await getDataFromRequest(request);
		if (!body) {
			response.writeHead(httpStatusCode.ERROR, {
				'Content-Type': 'application/json',
			});
			response.end(
				JSON.stringify({ message: 'No Data received to edit task' })
			);
		} else {
			let data = {
				...body,
				token: token,
			};
			const message = await editTaskModel(data);
			response.writeHead(httpStatusCode.OK, {
				'Content-Type': 'application/json',
			});
			response.end(JSON.stringify(message));
		}
	} else {
		response.writeHead(httpStatusCode.OK, {
			'Content-Type': 'application/json',
		});
		response.end(
			JSON.stringify({
				message: 'NO TOKENNNNNN',
			})
		);
	}
};

const toggleTask = async (request, response) => {
	const token = request.headers['authorization'];
	if (token) {
		const body = await getDataFromRequest(request);
		if (!body) {
			response.writeHead(httpStatusCode.ERROR, {
				'Content-Type': 'application/json',
			});
			response.end(
				JSON.stringify({ message: 'No Data received to edit task' })
			);
		} else {
			let data = {
				id: body,
				token: token,
			};
			const message = await toggleTaskModel(data);
			response.writeHead(httpStatusCode.OK, {
				'Content-Type': 'application/json',
			});
			response.end(JSON.stringify(message));
		}
	} else {
		response.writeHead(httpStatusCode.OK, {
			'Content-Type': 'application/json',
		});
		response.end(
			JSON.stringify({
				message: 'NO TOKENNNNNN',
			})
		);
	}
};

module.exports = {
	addTask,
	getAllTasks,
	deleteTask,
	editTask,
	toggleTask,
	deleteAllTasks,
};
