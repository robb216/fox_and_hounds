import React, { Component } from 'react';

const boardSpaceTypes = {
    TYPE_WHITE: '.',
    TYPE_BLACK: 'X',
    TYPE_HOUND: 'h',
    TYPE_FOX  : 'f',
};

class BoardSpace extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        let { coordinate, type } = this.props;

        this.props.onClick(coordinate, type);
    }

    render() {
        let { coordinate } = this.props;
        return (
            <td onClick={ () => this.onClick() }>
                { this.props.type }
                <span className="coord">{coordinate.x},{coordinate.y}</span>
            </td>
        );
    }
} 

export default BoardSpace;
export const types = boardSpaceTypes;