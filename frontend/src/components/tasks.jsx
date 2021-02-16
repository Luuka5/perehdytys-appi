import React from 'react';

import images from './images.jsx';

class Task extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className={"task"+ (this.props.done ? " taskDone" : "")}>
                <h3>{this.props.name}</h3>
                <p>{this.props.description}</p>

                <a href={this.props.link}
                    className="link button" >
                    <images.Link />
                    <p>{this.props.link}</p>
                </a>

                <button className="button">
                    {this.props.done ? "Peruuta" : "Merkitse valmiiksi!"}
                </button>
            </div>
        );
    }
}

class Tasks extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let list;
        if (this.props.tasks) {

            this.props.tasks.sort((a, b) => {
                return a.priority - b.priority
            });

            list = this.props.tasks.filter(this.props.filter).map((task, i) => {
                return (
                    <Task
                        key={i}
                        name={task.name}
                        description={task.description}
                        link={task.link}
                        done={false}
                    />
                )
            });
        } else {
            list = (
                <div className="loadingContainer">
                    <h2>Ladataan...</h2>
                </div>
            )
        }

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