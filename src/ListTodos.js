export const ListTodos = (todos, show = false) => {
	// destructuring the todos
	if (show) {
		todos.forEach(({ id, todo, completed }) => {
			console.log('id:', id)
			console.log('todo:', todo)
			console.log('completed:', completed)
			console.log('---------------------')
		})
	} else {
		todos.forEach(({ id, todo, completed }) => {
			console.log('todo:', todo)
			console.log('-'.repeat(20))
		})
	}
}
