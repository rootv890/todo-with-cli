/**
 * This file is used to connect to the  FS based database for v1.0
 * v2.0 will use SQLite (or any other SQL based DB)
 * Why db.js? Because it's a common convention to keep all the database related code in a separate file
 */

import fs from 'fs/promises'

// for module type
const DB_PATH = new URL('./db.json', import.meta.url).pathname

// debug
// console.log('DB Path:', DB_PATH) //working

// DB Commands - CRUD
/**
 * GetDB, SaveDB, insertDB, updateDB, deleteDB
 * for v1.0.0, GetDB, SaveDB, InsertDB,DeleteDB are enough
 * for v1.0.1, updateDB will be added
 * for v2.0.0, SQLite will be used
 */

/**
 * Custom NameConvection by ProotV
 * function will written from getDB (camelCase) to Get_DB (PascalCase)
 */

/**
 * Get_DB
 * @returns {Promise} - JSON Object
 * @throws {Error} - Error
 * @description - Get the todos from the file system
 * @example - Get_DB()
 * @version v1.0.0
 * @summary Get the todos from the file system (v1.0.0)
 * */

export const Get_DB = async () => {
	try {
		// read the file
		const db = await fs.readFile(DB_PATH, 'utf-8')
		return JSON.parse(db)
	} catch (error) {
		// throw new Error(error)
		console.error('Something went wrong\n', error)
	}
}

/**
 * Save_DB
 * @returns {Promise} - JSON Object
 * @throws {Error} - Error
 * @description - Save the todos to the file system
 * @example - Save_DB()
 * @version v1.0.0
 * @summary Save the todos to the file system (v1.0.0)
 */

export const Save_DB = async db => {
	try {
		// Write the file
		await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2))
		return db
	} catch (error) {
		console.error('@Save_DB Something went wrong\n', error)
	}
}

/**
 * Insert_DB
 * @param {Object} todo - Todo Object
 * @returns {Promise} - Todo Object
 * @throws {Error} - Error
 * @description - Insert the todo to the database
 * @example - Insert_DB({todo: 'Todo 1', id:Date.now(), completed: false})
 * @version v1.0.0
 * @summary Insert the todo to the database (v1.0.0)
 */

export const Insert_DB = async todo => {
	const db = await Get_DB()
	// add the todo to the db
	// Check if the todo is already in the db
	if (db.todos.find(t => t.id === todo.id)) {
		console.error('ID already exists')
		return
	}

	db.todos.push(todo)
	// update the db
	await Save_DB(db)
	// return
	return todo
}

/**
 * Update_DB
 * @param {Number} id - Todo ID
 * @param {Object} todo - Todo Object
 * @returns {Promise} - Todo Object
 * @throws {Error} - Error
 * @description - Update the todo in the database
 * @example - Update_DB(1, {todo: 'Todo 1', id: Date.now(), completed: true})
 * @version v1.0.0
 * @summary Update the todo in the database (v1.0.0)
 * */

export const Delete_DB = async id => {
	const db = await Get_DB()

	// check if id is available
	if (!db.todos.find(todo => todo.id === id)) {
		console.error('ID not found')
		return
	}
	// filter the todos with the id
	db.todos = db.todos.filter(todo => todo.id !== id)
	// update the db
	Save_DB(db)
	return id
}
