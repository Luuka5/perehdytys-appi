import React from 'react';


function Property(props) {
    let value = props.value;
    if (!value) value = props.type === 'number' ? 0 : '';
    if (props.type === 'number') value = value + '';

    return (
        <div className="property">
            <label className="label">{props.label}</label>
            <input
                className="input"
                type={props.type}
                defaultValue={value}
                onChange={e => {
                    let value = e.target.value;
                    try {
                        if (props.type === 'number')
                            value = parseInt(value);
                    } catch (err) {
                        value = 0;
                    }
                    if (value === '' && props.optional === true) value = undefined;
                    props.handleChange(value);
                }} />
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

    deleteTask(index) {
        const tasks = [...this.state.data.tasks];
        tasks.splice(index, 1);
        this.setState({
            data: {...this.state.data, tasks},
        });
    }

    addTask() {
        this.setState({
            data: {
                ...this.state.data,
                nextTaskIndex: this.state.data.nextTaskIndex + 1,
                tasks: [...this.state.data.tasks, {
                    id: this.state.data.nextTaskIndex,
                    name: 'Nimetön tehtävä',
                    priority: 0,
                    category: this.state.data.categories[0].id || 0,
                }],
            },
        });
    }

    setTaskValue(taskIndex, values) {
        const tasks = [...this.state.data.tasks];
        tasks[taskIndex] = {...tasks[taskIndex],  ...values};
        this.setState({
            data: {...this.state.data, tasks},
        });
    }

    setCategoryName(id, name) {
        const categories = [...this.state.data.categories];
        const instructorCategories = [...this.state.data.instructorCategories];
        for (let c of [...categories, ...instructorCategories]) {
            if (c.id === id) {
                c.name = name;
                this.setState({ data: {
                    ...this.state.data,
                    categories,
                    instructorCategories,
                }});
                return;
            }
        }
    }
    
    moveCategory(id, instructorMode) {
        let category;
        const filter = c => {
            if (c.id === id) {
                category = c;
                return false;
            }
            return true;
        }
        const categories = this.state.data.categories.filter(filter);
        const instructorCategories = this.state.data.instructorCategories.filter(filter);

        if (instructorMode) {
            instructorCategories.push(category);
        } else {
            categories.push(category);
        }
        
        this.setState({ data: {
            ...this.state.data,
            categories,
            instructorCategories,
        }});
    }
    
    deleteCategory(id) {
        const filter = c => c.id !== id;
        
        this.setState({ data: {
            ...this.state.data,
            categories: this.state.data.categories.filter(filter),
            instructorCategories: this.state.data.instructorCategories.filter(filter),
        }});
    }

    addCategory() {
        this.setState({
            data: {
                ...this.state.data,
                nextCategoryIndex: this.state.data.nextCategoryIndex + 1,
                categories: [...this.state.data.categories, {
                    id: this.state.data.nextCategoryIndex,
                    name: 'Nimetön kategoria',
                }],
            },
        });
    }

    getHighestId(arr) {
        if (!arr) return 0;
        let result = 0;
        for (let obj of arr) {
            if (!obj.id) continue;
            if (obj.id > result) result = obj.id;
        }
        return result;
    }

    loadLocalFile(files) {
        try {
            const reader = new FileReader();
            reader.onload = e => {
                try {
                    const data = JSON.parse(e.target.result);
                    this.setState({
                        data: {
                            ...{
                                nextTaskIndex: this.getHighestId(data.tasks) + 1,
                                nextCategoryIndex: Math.max(this.getHighestId(data.categories), this.getHighestId(data.instructorCategories)) + 1,
                                tasks: [],
                                categories: [],
                                instructorCategories: [],
                            },
                            ...data,
                        },
                    });
                } catch(err) {
                    console.log('Tiedoston avaaminen ei onnistunut');
                }
            }
            reader.readAsText(files[0]);
        } catch(err) {
            console.log('Tiedoston avaaminen ei onnistunut');
        }
    }

    render() {

        const categoryOptions = [...this.state.data.categories, ...this.state.data.instructorCategories]
            .map(category => {
                return (
                    <option value={category.id} key={category.id}>{category.name}</option>
                )
            })

        const tasks = this.state.data.tasks.map((task, i) => {
            return (
                <div key={task.id} className="editorTask">
                    <Property
                        label="Nimi:"
                        value={task.name}
                        type="text"
                        handleChange={value => this.setTaskValue(i, { name: value })} />
                    <Property
                        label="Kuvaus:"
                        optional={true}
                        value={task.description}
                        type="text"
                        handleChange={value => this.setTaskValue(i, { description: value })} />
                    <Property
                        optional={true}
                        label="tekstitiedosto:"
                        value={task.text}
                        type="text"
                        handleChange={value => this.setTaskValue(i, { text: value })} />
                    <Property
                        optional={true}
                        label="linkki:"
                        value={task.link}
                        type="text"
                        handleChange={value => this.setTaskValue(i, { link: value })} />
                    <Property
                        label="Tärkeys:"
                        value={task.priority}
                        type="number"
                        handleChange={value => this.setTaskValue(i, { priority: value })} />
                        
                    <div className="property">
                    <label className="label">Kategoria:</label>
                        <select
                            defaultValue={task.category}
                            className="input"
                            onChange={e => {
                                try {
                                    this.setTaskValue(i, { category: parseInt(e.target.value) });
                                } catch (err) {
                                    this.setTaskValue(i, { category: 0 });
                                }
                            }} >
                            {categoryOptions}
                        </select>
                    </div>
                    <button
                        className="button"
                        onClick={() => this.deleteTask(i)} >
                        Poista
                    </button>
                </div>
            )
        });

        const categories = [
            ...this.state.data.categories,
            ...this.state.data.instructorCategories.map(c => {
                const category = {...c};
                category.forInstructor = true;
                return category;
            })
        ]
        .sort((a, b) => a.id - b.id)
        .map(category => {
            return (
                <div key={category.id} className="editorTask">
                    <Property
                        label="Nimi:"
                        value={category.name}
                        type="text"
                        handleChange={value => this.setCategoryName(category.id, value)} />
                        
                    <div className="property">
                        <label className="label">Vain perehdyttäjälle:</label>
                        <button
                            className="button input"
                            onClick={() => this.moveCategory(category.id, category.forInstructor === undefined)}>
                            {category.forInstructor ? 'Kyllä' : 'Ei'}
                        </button>
                    </div>
                    <button
                        className="button"
                        onClick={() => this.deleteCategory(category.id)} >
                        Poista
                    </button>
                </div>
            );
        });

        return (
            <div className="editorContainer">
                <p className="editorHeading">Tehtävä editori</p>
                <a
                    href={'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.state.data))}
                    download="tasks.json">
                    <button className="button">Lataa tehtävät tiedostona</button>
                </a>
                <div className="property button">
                    <p className="label">Avaa tiedosto:</p>
                    <input
                        type="file"
                        accept=".json"
                        onChange={e => this.loadLocalFile(e.target.files)} />
                </div>
                <div className="editableContent">
                    <div className="editorTaskContainer">
                        <p className="editorHeading">Tehtävät:</p>
                        {tasks}
                        <button
                            className="button"
                            onClick={() => this.addTask()} >
                            Lisää tehtävä
                        </button>
                    </div>
                    <div className="editorTaskContainer">
                        <p className="editorHeading">Kategoriat:</p>
                        {categories}
                        <button
                            className="button"
                            onClick={() => this.addCategory()} >
                            Lisää kategoria
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Editor;