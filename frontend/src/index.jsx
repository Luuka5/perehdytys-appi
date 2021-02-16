import React from 'react';
import ReactDOM from 'react-dom';

import './css/style.css';
import './css/task.css';
import './css/sidebar.css';
import './css/images.css';

import Sidebar from './components/sidebar.jsx';
import Tasks from './components/tasks.jsx';

const contentTypes = {
	todo: 0,
	tasks: 1,
	settings: 2,
	info: 3,
};
Object.freeze(contentTypes);

class App extends React.Component {

	constructor(props) {
		super(props);

		const firstTime = localStorage.getItem('isInfoDisplayed') === null;
		if (firstTime) { localStorage.setItem('isInfoDisplayed', true); }

		let tasksDone = JSON.parse(localStorage.getItem('tasksDone'));
		if (!Array.isArray(tasksDone)) tasksDone = [];

		this.state = {
			tasks: [],
			categories: [],
			currnetCategory: 0,
			contentType: firstTime ? contentTypes.info : contentTypes.todo,
			tasksDone: tasksDone,
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
					categories: data.categories
				})
			});
	}

	getTaskFilter() {
		if (this.state.contentType === contentTypes.tasks) {
			return task => task.category === this.state.currnetCategory;
		}
		return () => true;
	}

	changeCategory(i) {
		this.setState({
			currnetCategory: i,
			contentType: contentTypes.tasks,
		});
	}

	saveData(data) {
		localStorage.setItem('tasksDone', JSON.stringify(data));
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
		this.saveData(tasksDone);
	}

	render() {
		let content;
		switch (this.state.contentType) {
			case contentTypes.todo:
				content = (
					<div>
						<Tasks
							filter={() => true}
							category={"Seuraavaksi:"}
							tasks={this.state.tasks}
							markTask={(id, isDone) => this.markTask(id, isDone)}
						/>
					</div>
				);
				break;
			case contentTypes.tasks:
				content = (
					<Tasks
						filter={this.getTaskFilter()}
						category={this.state.categories[this.state.currnetCategory]}
						tasks={this.state.tasks}
						markTask={(id, isDone) => this.markTask(id, isDone)}
					/>
				);
				break;
			case contentTypes.settings:
				content = (
					<p>Asetukset</p>
				);
				break;
			case contentTypes.info:
				content = (
					<p>Tervetuloa</p>
				);
				break;
		}

		return (
			<div className="app">
				<Sidebar
					categories={this.state.categories}
					changeCategory={(i) => this.changeCategory(i)}
					changeContent={(id) => this.setState({ contentType: id })}
					buttons={[
						{ id: contentTypes.info, text: "Info" },
						{ id: contentTypes.todo, text: "TODO-lista" },
						{ id: contentTypes.settings, text: "Asetukset" },
					]}
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
