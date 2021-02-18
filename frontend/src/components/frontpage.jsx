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
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel velit eu augue interdum imperdiet. Nam venenatis mattis nunc id tempor. Sed tempor consequat bibendum. Maecenas scelerisque sollicitudin enim vel mattis. Curabitur convallis malesuada lorem in pharetra. Cras sed interdum dolor. Etiam porta erat elit, mattis dictum ex scelerisque cursus. Sed purus magna, bibendum eget tortor sit amet, elementum fermentum nunc. In scelerisque ut urna a bibendum. Cras egestas bibendum arcu et tempus.

Curabitur quis massa quis elit suscipit elementum. Sed non libero ac sapien tempor tempus. Suspendisse sit amet interdum justo, quis efficitur orci. In vitae ultrices mauris. Aliquam erat volutpat. Nunc nulla enim, euismod vel orci nec, venenatis euismod metus. Curabitur feugiat dapibus nunc. In orci sem, condimentum at tincidunt in, placerat a elit.
                    </p>
                </div>
                <button onClick={() => {this.props.showTasks()}} className="button">
                    Näytä TODO-lista
                </button>
            </div>
        );
    }
}

export default Frontpage;