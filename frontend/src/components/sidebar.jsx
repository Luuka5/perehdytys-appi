import React from 'react';

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

    render() {
        return (
            <div>
                <div className={"sidebar" + (this.state.isVisible ? "" : " hide")}>
                    <div>
                        <p className="sidebarHeading">Kategotiat:</p>
                        <div className="buttonGroup">
                            <p className="sidebarButton">Hallinnolliset asiat</p>
                            <p className="sidebarButton">Ensimmäinen viikko</p>
                        </div>
                        <p className="sidebarHeading">Perehdyttäjälle:</p>
                        <div className="buttonGroup">
                            <p className="sidebarButton">Hallinnolliset asiat</p>
                            <p className="sidebarButton">Ensimmäinen viikko</p>
                        </div>
                    </div>
                </div>
                <p className="button toggleSidebarButton" onClick={() => this.toggleSidebar()}>Kategoriat</p>
            </div>
        );
    }
}

export default Sidebar;