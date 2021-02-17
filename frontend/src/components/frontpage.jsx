import React from 'react';
import images from './images.jsx';

class Frontpage extends React.Component {
    render() {
        return (
            <div className="frontpage">
                <div className="frontpagebg" >
                    <images.FrontpageBg />
                </div>
                <div className="frontpageHeading">
                    <p>Tervetuloa</p>
                    <p>Fraktiolle!</p>
                </div>
                <div className="introContainer">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae neque in tortor blandit efficitur vel id dolor.</p>
                </div>
                <button onClick={() => {this.props.showTasks()}} className="button">
                    Näytä seuraavat tehtävät
                </button>
            </div>
        );
    }
}

export default Frontpage;