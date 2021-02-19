import React from 'react';

function Property(props) {
    return (
        <div className="property">
            <label className="label">{props.label}</label>
            <input type={props.type} defaultValue={props.value} />
        </div>
    );
}

class Editor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                tasks: [],
                categories: [],
                instructorCategories: [],
            },
        };

        fetch('./tasks.json')
            .then(res => res.json())
            .then(data => this.setState({ data }))
    }

    render() {

        const categoryOptions = [...this.state.data.categories, ...this.state.data.instructorCategories]
            .map(category => {
                return (
                    <option key={category.id}>{category.name}</option>
                )
            })

        const tasks = this.state.data.tasks.map((task, i) => {
            return (
                <div key={i} className="editorTask">
                    <Property
                        label="Nimi:"
                        value={task.name}
                        type="text" />
                    <Property
                        label="
                        Kuvaus:"
                        value={task.description}
                        type="text" />
                    <Property
                        label="tekstitiedosto:"
                        value={task.text}
                        type="text" />
                    <Property
                        label="linkki:"
                        value={task.link}
                        type="text" />
                    <Property
                        label="linkki:"
                        value={task.link}
                        type="text" />
                </div>
            )
        });

        return (
            <div className="editorContainer">
                <div className="taskContainer">
                    <p>Editori</p>
                    {tasks}
                </div>
            </div>
        );
    }
}

export default Editor;