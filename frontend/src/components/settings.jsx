import React from 'react';

function Option(props) {
	return (
		<div className="option" onClick={props.onClick}>
			<div className={props.selected ? "selected" : ""}/>
			<button>{props.text}</button>
		</div>
	)
}

function Settings(props) {
    function handleChange(changes) {
        props.handleChange({...props.settings, ...changes});
    }

    return (
        <div className="settings">
            <h1 className="settingsHeading">Asetukset</h1>
            <div>
                <p className="optionHeading">Teema:</p>
                <div className="options">
                    <Option
                        text="Vaalea"
                        selected={props.settings.theme === 0}
                        onClick={() => handleChange({ theme: 0 })} />
                    <Option text="Tumma" selected={props.settings.theme === 1}
                        selected={props.settings.theme === 1}
                        onClick={() => handleChange({ theme: 1 })} />
                </div>
                <p className="optionHeading">Tila:</p>
                <div className="options">
                    <Option
                        text="Oletus tila"
                        selected={props.settings.mode === 0}
                        onClick={() => handleChange({ mode: 0 })} />
                    <Option text="Perehdyttäjä tila" selected={props.settings.theme === 1}
                        selected={props.settings.mode === 1}
                        onClick={() => handleChange({ mode: 1 })} />
                </div>
            </div>
            <button className="button">Nollaa kaikki tiedot</button>
        </div>
    );
}

export default Settings;