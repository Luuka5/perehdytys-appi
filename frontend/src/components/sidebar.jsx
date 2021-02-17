import React from 'react';
import images from './images.jsx';

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
        }
    }

    toggleSidebar() {
        this.setState({
            isVisible: !this.state.isVisible,
        });
    }

    changeCategory(index) {
        this.props.changeCategory(index);
        this.setState({ isVisible: false });
    }

    changeContent(index) {
        this.props.changeContent(index);
        this.setState({ isVisible: false });
    }

    render() {
        let categories;
        if (this.props.categories) {
            categories = this.props.categories.map((category, i) => {
                return (
                    <button
                        key={i}
                        className="sidebarButton"
                        onClick={() => this.changeCategory(category.id)} >
                        {category.name}
                    </button>
                )
            });
        } else {
            categories = (
                <p>Ladataan...</p>
            );
        }

        const buttons = this.props.buttons.map((button, i) => {
            return (
                <button
                    key={i}
                    className="sidebarButton"
                    onClick={() => this.changeContent(button.id)}
                >{button.text}</button>
            )
        });

        return (
            <div>
                <div className={"sidebar" + (this.state.isVisible ? "" : " hide")}>
                    {buttons}
                    <div>
                        <p className="sidebarHeading">Kategotiat:</p>
                        <div className="buttonGroup">
                            {categories}
                        </div>
                    </div>
                </div>
                <div className="button toggleSidebarButton" onClick={() => this.toggleSidebar()}>
                    <images.SidebarIcon />
                </div>
            </div>
        );
    }
}

export default Sidebar;