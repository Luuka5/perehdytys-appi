import React from 'react';

import images from './images.jsx';

class Task extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showText: false,
            isTextLoaded: false,
            textContent: 'Ladataan...',
        };
    }

    loadText() {
        fetch('./texts/' + this.props.text)
            .then(res => res.text())
            .then(textContent => this.setState({ textContent, isTextLoaded: true }))
            .catch(() => this.setState({ textContent: "Tekstin lataaminen epäonnistui." }));
    }

    getTextContent() {
        if (!this.state.isTextLoaded) this.loadText();
        return (
            <div className="popupContainer">
                <div className="popupWindow textWindow">
                    <button
                        onClick={() => this.setState({ showText: false })}
                        className="button closeTextButton">
                        <images.xIcon />
                    </button>
                    <p className="textContent">{this.state.textContent}</p>
                </div>
            </div>
        )
    }
    
    render() {
        const description = this.props.description ? (
            <p className="taskDescription">{this.props.description}</p>
        ) : null;
        const link = this.props.link ? (
            <a href={this.props.link}
                className="link button" >
                <images.Link />
                <p>{this.props.link}</p>
            </a>
        ) : null;
        const text = this.props.text ? (
            <div onClick={() => this.setState({ showText: true })}
                className="link button" >
                <images.Text />
                <p>{this.props.text}</p>
            </div>
        ) : null;

        return (
            <div>
                <div className={"task"+ (this.props.done ? " taskDone" : "")}>
                    <div className="taskHeadingContainer">
                        <p className="taskHeading">{this.props.name}</p>
                        {this.props.done ? (<p className="taskHeading">Valmis</p>) : null}
                    </div>
                    {description}
                    {text}
                    {link}
                    <button
                        className="button"
                        onClick={() => this.props.onDoneClicked(!this.props.done)}>
                        {this.props.done ? "Peruuta" : "Merkitse valmiiksi"}
                    </button>
                </div>
                {this.state.showText ? this.getTextContent() : ''}
            </div>
        );
    }
}

class Tasks extends React.Component {

    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    
    render() {

        let list;
        if (this.props.tasks) {

            this.props.tasks.sort((a, b) => {
                if (!(a.done && b.done)) {
                    if (a.done) return 1;
                    if (b.done) return -1;
                }
                return b.priority - a.priority
            });

            list = this.props.tasks.filter(this.props.filter).map((task, i) => {
                return (
                    <Task
                        key={i}
                        name={task.name}
                        description={task.description}
                        link={task.link}
                        text={task.text}
                        done={task.done}
                        onDoneClicked={isDone => this.props.markTask(task.id, isDone)}
                    />
                )
            });

            if (list.length === 0) {
                list = (
                    <div className="loadingContainer">
                        <p>Täällä ei ole mitään tehtävää.</p>
                    </div>
                )
            }

        } else {
            list = (
                <div className="loadingContainer">
                    <p>Ladataan...</p>
                </div>
            )
        }

        return (
            <div className="taskContainer">
                <div id="taskContainer"  className="categoryNameContainer">
                    <h1 className="categoryName">{this.props.categoryName}</h1>
                    <images.Waves />
                </div>
                {list}
            </div>
        )
    }
}

export default Tasks;