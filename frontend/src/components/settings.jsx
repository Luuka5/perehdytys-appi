import React from 'react';
import { render } from 'react-dom';

function Option(props) {
	return (
		<div className="option" onClick={props.onClick}>
			<div className={props.selected ? "selected" : ""}/>
			<button>{props.text}</button>
		</div>
	)
}

class Settings extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            confirmReset: false,
        }
    }

    handleChange(changes) {
        this.props.handleChange({...this.props.settings, ...changes});
    }

    getConfirmPrompt() {
        if (!this.state.confirmReset) return;
        return (
            <div className="popupContainer">
                <div className="popupWindow">
                    <p className="resetConfirmText">Haluatko varmasti poistaa kaikki tiedot?</p>
                    <div className="buttonContainer">
                        <button
                            onClick={() => this.setState({ confirmReset: false })}
                            className="button" >
                            Peruuta
                        </button>
                        <button
                            onClick={() => {
                                this.setState({ confirmReset: false });
                                this.props.reset();
                            }}
                            className="button" >
                            Kyllä
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    render() {

        return (
            <div className="settings">
                <h1 className="settingsHeading">Asetukset</h1>
                <div>
                    <p className="optionHeading">Teema:</p>
                    <div className="options">
                        <Option
                            text="Käyttöjärjestelmän oletus"
                            selected={this.props.settings.theme === ''}
                            onClick={() => this.handleChange({ theme: '' })} />
                        <Option
                            text="Vaalea"
                            selected={this.props.settings.theme === 'lightTheme'}
                            onClick={() => this.handleChange({ theme: 'lightTheme' })} />
                        <Option
                            text="Tumma"
                            selected={this.props.settings.theme === 'darkTheme'}
                            onClick={() => this.handleChange({ theme: 'darkTheme' })} />
                    </div>
                    <p className="optionHeading">Tila:</p>
                    <div className="options">
                        <Option
                            text="Oletustila"
                            selected={!this.props.settings.instructorMode}
                            onClick={() => this.handleChange({ instructorMode: false })} />
                        <Option text="Perehdyttäjätila" selected={this.props.settings.theme === 1}
                            selected={this.props.settings.instructorMode}
                            onClick={() => this.handleChange({ instructorMode: true })} />
                    </div>
                </div>
                <button
                    className="button"
                    onClick={() => this.setState({ confirmReset: true })}>
                    Nollaa kaikki tiedot
                </button>
                {this.getConfirmPrompt()}
            </div>
        );
    }
}

export default Settings;