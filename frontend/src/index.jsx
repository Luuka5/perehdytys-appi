import React from 'react';
import ReactDOM from 'react-dom';

import './css/style.css';
import './css/task.css';
import './css/sidebar.css';
import './css/settings.css';
import './css/frontpage.css';
import './css/images.css';
import './css/editor.css';

import Sidebar from './components/sidebar.jsx';
import Tasks from './components/tasks.jsx';
import Settings from './components/settings.jsx';
import Frontpage from './components/frontpage.jsx';
import Editor from './components/editor.jsx';

const contentTypes = {
	todo: 0,
	tasks: 1,
	settings: 2,
	frontpage: 3,
	ready: 4,
	instructorTodo: 5,
	editor: 6,
};
Object.freeze(contentTypes);

class App extends React.Component {

	constructor(props) {
		super(props);

		const firstTime = localStorage.getItem('isInfoDisplayed') === null;
		if (firstTime) { localStorage.setItem('isInfoDisplayed', true); }

		let tasksDone = JSON.parse(localStorage.getItem('tasksDone'));
		if (!Array.isArray(tasksDone)) tasksDone = [];

		let settings = JSON.parse(localStorage.getItem('settings'));
		if (!settings) {
			settings = {
				theme: '',
				instructorMode: false,
			}
		}

		this.state = {
			tasks: [],
			categories: [],
			instructorCategories: [],
			currnetCategory: 0,
			contentType: firstTime ? contentTypes.frontpage : contentTypes.todo,
			tasksDone: tasksDone,
			settings: settings,
		}

		fetch('./tasks.json')
			.then(res => res.json())
			.then(data => {

				const tasks = data.tasks.map(task => {
					task.done = tasksDone.includes(task.id);
					return task;
				});

				this.setState({
					tasks: tasks,
					categories: data.categories,
					instructorCategories: data.instructorCategories,
				});
			});
	}
	
	changeCategory(i) {
		this.setState({
			currnetCategory: i,
			contentType: contentTypes.tasks,
		});
	}

	markTask(taskId, isDone) {
		const tasks = [...this.state.tasks];
		for (let task of tasks) {
			if (task.id === taskId) {
				task.done = isDone;
				break;
			}
		}

		const tasksDone = tasks.filter(task => task.done).map(task => {
			return task.id;
		});

		this.setState({ tasks, tasksDone });
		localStorage.setItem('tasksDone', JSON.stringify(tasksDone));
	}

	reset() {
		this.setState({
			settings: {
				theme: '',
				instructorMode: false,
			},
			tasksDone: [],
		});
		this.state.tasks.forEach(task => task.done = false);

		localStorage.clear();
	}

	getCategories() {
		if (this.state.settings.instructorMode)
			return [...this.state.categories, ...this.state.instructorCategories]
		return this.state.categories;
	}

	getCurrentCategory() {
		for (let category of this.getCategories()) {
			if (category.id === this.state.currnetCategory)
				return category;
		}
		return {
			name: 'Kategoriaa ei löytynyt.',
		};
	}

	render() {
		let content;
		switch (this.state.contentType) {
			case contentTypes.todo:
				content = (
					<Tasks
						filter={task => {
							return this.state.categories
								.map(c => c.id)
								.includes(task.category)
								&& !task.done;
						}}
						categoryName="Seuraavaksi:"
						tasks={this.state.tasks}
						markTask={(id, isDone) => this.markTask(id, isDone)}
					/>
				);
				break;
			case contentTypes.instructorTodo:
				content = (
					<Tasks
						filter={task => {
							return this.state.instructorCategories
								.map(c => c.id)
								.includes(task.category)
								&& !task.done;
						}}
						categoryName="Seuraavaksi:"
						tasks={this.state.tasks}
						markTask={(id, isDone) => this.markTask(id, isDone)}
					/>
				);
				break;
			case contentTypes.tasks:
				content = (
					<Tasks
						filter={task => task.category === this.state.currnetCategory}
						categoryName={this.getCurrentCategory().name}
						tasks={this.state.tasks}
						markTask={(id, isDone) => this.markTask(id, isDone)}
					/>
				);
				break;
			case contentTypes.settings:
				content = (
					<Settings
						settings={this.state.settings}
						handleChange={settings => {
							this.setState({ settings });
							localStorage.setItem('settings', JSON.stringify(settings));
						}}
						reset={() => this.reset()}/>
				);
				break;
			case contentTypes.frontpage:
				content = (
					<Frontpage showTasks={() => this.setState({ contentType: contentTypes.todo })}/>
				);
				break;
			case contentTypes.ready:
				content = (
					<Tasks
						filter={task => {
							return this.getCategories()
								.map(c => c.id)
								.includes(task.category)
								&& task.done;
						}}
						categoryName="Valmiiksi merkityt tehtävät:"
						tasks={this.state.tasks}
						markTask={(id, isDone) => this.markTask(id, isDone)}
					/>
				);
				break;
			case contentTypes.editor:
				content = (
					<Editor />
				);
				break;
		}

		let buttons = [
			{ id: contentTypes.frontpage, text: "Etusivu" },
			{ id: contentTypes.settings, text: "Asetukset" },
			{ id: contentTypes.todo, text: "TODO-lista" },
			{ id: contentTypes.ready, text: "Valmiiksi merkityt" },
		];
		if (this.state.settings.instructorMode) {
			buttons = buttons.concat([
				{ id: contentTypes.instructorTodo, text: "TODO-lista perehdyttäjälle" },
				{ id: contentTypes.editor, text: "Tehtävä editori" },
			]);
		}

		return (
			<div className={"app " + this.state.settings.theme}>
				<Sidebar
					categories={this.getCategories()}
					changeCategory={(i) => this.changeCategory(i)}
					changeContent={(id) => this.setState({ contentType: id })}
					buttons={buttons}
				/>
				{content}
			</div>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);
