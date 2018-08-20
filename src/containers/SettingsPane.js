import React, { Component } from 'react';

class MessagePane extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props.initialSettings
        };
        this.onChange = this.onChange.bind(this);
    }

    // Source: reactjs docs https://reactjs.org/docs/forms.html
    onChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        this.setState({ [name]: value }, () => this.props.onSettingsChange(this.state));
      }

    render() {
        return (
            <form>
                <h3>Board settings</h3>
                <div><label>
                    Bord size:
                    <input
                        name="boardSize"
                        type="number"
                        value={ this.state.boardSize }
                        onChange={ this.onChange }
                    />
                </label></div>
                <div><label>
                    Hounds quantity:
                    <input
                        name="houndsQuantity"
                        type="number"
                        value={ this.state.houndsQuantity }
                        onChange={ this.onChange }
                    />
                </label></div>
                <div><label>
                    Fox starting position:
                    <input
                        name="foxStartPosition"
                        type="number"
                        value={ this.state.foxStartPosition }
                        onChange={ this.onChange }
                    />
                </label></div>
                <div><label>
                    Start as fox:
                    <input
                        name="startAsFox"
                        type="checkbox"
                        checked={ this.state.startAsFox }
                        onChange={ this.onChange }
                    />
                </label></div>

                <h3>AI settings</h3>
                <div><label>
                    Enable AI:
                    <input
                        name="enableAi"
                        type="checkbox"
                        checked={ this.state.enableAi }
                        onChange={ this.onChange }
                    />
                </label></div>
                <div><label>
                    AI turn delay:
                    <input
                        name="aiDelay"
                        type="number"
                        value={ this.state.aiDelay }
                        onChange={ this.onChange }
                    />
                </label></div>
            </form>
        );
    }
}

export default MessagePane;