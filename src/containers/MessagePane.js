import React, { Component } from 'react';

class MessagePane extends Component {

    render() {
        let { message } = this.props;

        return <p>{ message }</p>;
    }
}

export default MessagePane;