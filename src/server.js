import fs from 'node:fs/promises'
import http from 'node:http'
import open from 'open'

const interpolate = (html, data) => {
	/* 
     {{todos}} -> data.todos
     {{date}} -> data.date
     {{id}} -> data.id
     */
	return html.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, placeholder) => {
		return data[placeholder] || ''
	})
}

const formatTodos = todos => {
	return todos
		.map(
			({ id, todo, tags, completed }) =>
				`
  <li class='todo-container'>
    <p class='id'>${id}</p>
    <p class='todo'>${todo}</p>
  <p class='tags'>
    <span class='tag'>${tags
			.map(tag => `<span class='tag'>${tag}</span>`)
			.join('')}</span>
  </p>
    <p class='completed'>${completed}</p>
  </li>
  `
		)
		.join('\n')
}

const createServer = (todos, port) => {
	return http.createServer(async (req, res) => {
		const HTML_PATH = new URL('./template.html', import.meta.url).pathname
		const template = await fs.readFile(HTML_PATH, 'utf-8')
		const html = interpolate(template, { todos: formatTodos(todos) })

		res.writeHead(200, { 'Content-Type': 'text/html' })
		res.end(html)
	})
}

// Use it when command is take Web [port]
export const start = (todos, port) => {
	const server = createServer(todos)

	server.listen(port, () => {
		const address = `http://localhost:${port}`
		console.log(`Server listening on ${address}`)
	})
	open(`http://localhost:${port}`)
}
