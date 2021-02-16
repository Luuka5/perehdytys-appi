import React from 'react';
import ReactDOM from 'react-dom';

import './css/style.css';
import './css/task.css';
import './css/sidebar.css';
import './css/images.css';

import Sidebar from './components/sidebar.jsx';
import Tasks from './components/tasks.jsx';

const contentTypes = {
	frontpage: 0,
	tasks: 1,
	settings: 2,
};
Object.freeze(contentTypes);

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			tasks: undefined,
			categories: undefined,
			currnetCategory: 0,
			contentType: contentTypes.frontpage,
		}

		fetch('./api/tasks')
			.then(res => res.json())
			.then(data => this.setState({ tasks: data.tasks, categories: data.categories }));
			
	}

	getTaskFilter() {
		if (this.state.isFrontpage) {
			return () => true;
		}

		return task => task.category === this.state.currnetCategory;
	}

	changeCategory(i) {
		this.setState({
			currnetCategory: i,
			contentType: contentTypes.tasks,
		});
	}

	render() {
		let content;
		switch (this.state.contentType) {
			case contentTypes.frontpage:
				content = (
					<div>
						<h1>Tervetuloa!</h1>
						<Tasks
							filter={() => true}
							category={"Seuraavaksi:"}
							tasks={this.state.tasks}
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
					/>
				);
				break;
			case contentTypes.settings:
				content = (
					<h1>Reset</h1>
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
						{ id: contentTypes.frontpage, text: "Etusivu" },
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
