/**
 * Command.js
 * Command.js is the main file for the CLI
 * It will handle all the commands and options
 * It will use the db.js to handle the database operations via todos.js
 * It will use the todos.js to handle the CRUD operations
 * It will use the ListTodos.js to display the todos
 * It will use the server.js to start the web server
 */

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import {
	newTodo,
	getall,
	findTodoById,
	deleteTodoById,
	editTodoByID,
	removeAllTodos
} from './todos.js'
import { ListTodos } from './ListTodos.js'
import { start } from './server.js'

// Command Line Interface
yargs(hideBin(process.argv))
	.command(
		'new <todo>',
		'Add a new todo',
		yargs => {
			return yargs.positional('todo', {
				describe: 'The todo to add',
				type: 'string'
			})
		},
		async argv => {
			const tags = argv.tags || []
			let todo = await newTodo(argv.todo, tags)
			console.log('Todo added!', todo)
		}
	)
	.options('tags', {
		alias: 't',
		type: 'array', // FIX : Challenge to make it array
		description: 'Add tags to the todo'
	})
	.command(
		'getall',
		'Add all the todos from file',
		() => {},
		async argv => {
			const todos = await getall()
			if (todos.length === 0) {
				console.log('Great! No todos found')
				return
			}
			ListTodos(todos)
		}
	)
	.command(
		'find <filter>',
		'Get all the todos that match the filter',
		yargs => {
			return yargs.positional('filter', {
				type: 'number',
				describe: 'The filter to apply to the todos'
			})
		},
		async argv => {
			const todos = await findTodoById(argv.filter)
			if (todos) {
				console.log('Todos found!\n')

				return ListTodos(todos)
			}
		}
	)
	.command(
		'delete <id>',
		'Delete a todo by id',
		yargs => {
			return yargs.positional('id', {
				type: 'number',
				describe: 'The id of the todo to delete'
			})
		},
		async argv => {
			const todo = await deleteTodoById(argv.id)
			console.log('Todo deleted!', todo)
		}
	)
	.command(
		'web [port]',
		'Start the web server to view the todos',
		yargs => {
			return yargs.positional('port', {
				type: 'number',
				describe: 'The port to run the server on',
				default: 3000
			})
		},
		async argv => {
			const todos = await getall()
			start(todos, argv.port)
		}
	)
	.command(
		'edit <id> <todo>',
		'Edit a todo by id',
		yargs => {},
		async argv => {
			// get id and todo
			const id = argv.id
			const todo = argv.todo

			// use editTodoByID
			const update = await editTodoByID(id, todo)
			console.log('Todo updated!\n', update)
		}
	)
	.command(
		'clean',
		'Clean all the todos',
		() => {},
		async argv => {
			removeAllTodos()
			console.log('All todos removed')
		}
	)
	.demandCommand(1, 'Idiot you need to provide a command')
	.strictCommands()
	.parse()
