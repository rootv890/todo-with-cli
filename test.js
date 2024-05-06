import { Insert_DB } from './src/db.js'
import { deleteTodoById, findTodoById } from './src/todos.js'

export const editTodoByID = async (id, todo) => {
	// find the todo using function findTodoById
	const match = await findTodoById(id)
	if (match) {
		await deleteTodoById(id)
		const udpatedTodo = {
			id: id,
			todo: todo,
			completed: false
		}
		await Insert_DB(udpatedTodo)
		return udpatedTodo
	} else {
		return 'ID not found'
	}
}

async function test() {
	const result = await editTodoByID(1715002911568, 'Hello World! Edited Todo3')
	console.log(result)

	return result
}
test()
