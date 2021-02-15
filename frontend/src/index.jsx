import React from 'react';
import ReactDOM from 'react-dom';

import './css/style.css';
import './css/task.css';
import './css/sidebar.css';
import './css/images.css';

import Sidebar from './components/sidebar.jsx';
import Tasks from './components/tasks.jsx';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			tasks: undefined,
		}

		fetch('./api/tasks')
			.then(response => response.json())
			.then(data => console.log(data));
			
	}

	render() {
		return (
			<div className="app">
				<Tasks
					category="Hallinnolliset asiat"
					tasks={
					[
						{
							"name": "Työsopimus",
							"link": "https://www.example.com",
							"priority": 5
						},
						{
							"name": "Sovi perehdyttäjä",
							"description": "Sovi ensisijainen perehdyttäjä ja tarkista hänen aikataulut, ohjeista ottamaan tämä boardi haltuun.",
							"priority": 2
						},
						{
							"name": "Sovi perehdyttäjä",
							"description": "Sovi ensisijainen perehdyttäjä ja tarkista hänen aikataulut, ohjeista ottamaan tämä boardi haltuun.",
							"priority": 2
						},
						{
							"name": "Sovi perehdyttäjä",
							"description": "Sovi ensisijainen perehdyttäjä ja tarkista hänen aikataulut, ohjeista ottamaan tämä boardi haltuun.",
							"priority": 2
						},
						{
							"name": "Sovi perehdyttäjä",
							"description": "Sovi ensisijainen perehdyttäjä ja tarkista hänen aikataulut, ohjeista ottamaan tämä boardi haltuun.",
							"priority": 2
						}
					]
				} />
				<Sidebar />
			</div>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);
