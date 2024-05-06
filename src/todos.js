/**
 * This file is used to handle the CRUD operations of the todos
 * Difference bet DB.js and Todo.js is that DB.js is used to handle the CRUD operations of the DB
 * and Todo.js is used to handle the CRUD operations of the todos
 */
import { Save_DB, Get_DB, Insert_DB, Delete_DB } from './db.js'

// Using DB functions

// New Todo
export const newTodo = async (todo, tags = []) => {
	const newTodo = {
		id: Date.now(),
		todo,
		tags,
		completed: false
	}
	const result = await Insert_DB(newTodo)
	return newTodo
}

export const getall = async () => {
	const { todos } = await Get_DB()
	return todos
}

export const findTodoById = async id => {
	const { todos } = await Get_DB()
	// filter
	const todo = await todos.filter(todo => todo.id === id)
	return todo
}

export const deleteTodoById = async id => {
	const { todos } = await Get_DB()
	const match = todos.find(todo => todo.id === id)
	if (match) {
		// filter
		const todo = await todos.filter(todo => todo.id !== id)

		// update the db
		await Save_DB({
			todos: todo
		})
		return id
	} else {
		return 'ID not found'
	}
}

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

export const removeAllTodos = () => {
	Save_DB({
		todos: []
	})
	return 'All Todos Removed'
}
