import React from 'react';
import ReactDOM from 'react-dom';

import './css/style.css';
import './css/task.css';
import './css/sidebar.css';
import './css/settings.css';
import './css/images.css';

import Sidebar from './components/sidebar.jsx';
import Tasks from './components/tasks.jsx';
import Settings from './components/settings.jsx';

const contentTypes = {
	todo: 0,
	tasks: 1,
	settings: 2,
	info: 3,
	editor: 4,
	instructorTodo: 5,
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
				theme: 0,
				mode: 1,
			}
		}

		this.state = {
			tasks: [],
			categories: [],
			instructorCategories: [],
			currnetCategory: 0,
			contentType: firstTime ? contentTypes.info : contentTypes.todo,
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

	getCurrentCategory() {
		for (let category of [...this.state.categories, ...this.state.instructorCategories]) {
			if (category.id === this.state.currnetCategory)
				return category;
		}
		return null;
	}

	render() {
		let content;
		switch (this.state.contentType) {
			case contentTypes.todo:
				content = (
					<div>
						<Tasks
							filter={task => 
								this.state.categories
									.map(c => c.id)
									.includes(task.category)}
							categoryName="Seuraavaksi:"
							tasks={this.state.tasks}
							markTask={(id, isDone) => this.markTask(id, isDone)}
						/>
					</div>
				);
				break;
			case contentTypes.instructorTodo:
				content = (
					<div>
						<Tasks
						filter={task => 
								this.state.instructorCategories
									.map(c => c.id)
									.includes(task.category)}
							categoryName="Seuraavaksi:"
							tasks={this.state.tasks}
							markTask={(id, isDone) => this.markTask(id, isDone)}
						/>
					</div>
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
						handleChange={settings => this.setState({ settings })} />
				);
				break;
			case contentTypes.info:
				content = (
					<div></div>
				);
				break;
		}

		let buttons = [
			{ id: contentTypes.settings, text: "Asetukset" },
			{ id: contentTypes.info, text: "Info" },
			{ id: contentTypes.todo, text: "TODO-lista" },
		];
		if (this.state.settings.mode === 1) {
			buttons = buttons.concat([
				{ id: contentTypes.instructorTodo, text: "TODO-lista perehdyttäjälle" },
				{ id: contentTypes.editor, text: "Editori" },
			]);
		}

		let themeStyle = {};
		if (this.state.settings.theme === 1) {
			themeStyle = {
				"--mainColor": "#b15552",
				"--backgroundColor":" #222021",
				"--textColor": "#ffffff",
				"--shadowColor": "#fff2",
				"--doneBrightness": "60%",
			}
		}

		return (
			<div className="app" style={themeStyle}>
				<Sidebar
					categories={[...this.state.categories, ...this.state.instructorCategories]}
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
