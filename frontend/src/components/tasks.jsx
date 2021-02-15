import React from 'react';

import images from './images.jsx';

class Task extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const button = this.props.done ?
            (<p>Merkitse valmiiksi!</p>) :
            (<p className="button">Peruuta</p>)

        return (
            <div className="task taskDone">
                <h3>{this.props.name}</h3>
                <p>{this.props.description}</p>
                <a href={this.props.link}>{this.props.link}</a>
                <p className="button">
                    {this.props.done ? "Peruuta" : "Merkitse valmiiksi!"}
                </p>
            </div>
        );
    }
}

class Tasks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: props.tasks,
        }

    }

    render() {
        this.state.tasks.sort((a, b) => {
            return a.priority - b.priority
        });

        const list = this.state.tasks.map((task, i) => {
            return (
                <Task
                    key={i}
                    name={task.name}
                    description={task.description}
                    link={task.link}
                    done={true}
                />
            )
        });

        return (
            <div className="taskContainer">
                <div className="taskHeadingContainer">
                    <h1 className="taskHeading">{this.props.category}</h1>
                    <images.Waves />
                </div>
                {list}
            </div>
        )
    }
}

export default Tasks;