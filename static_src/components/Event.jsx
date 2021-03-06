import React from 'react';
import PropTypes from 'prop-types';
import User from "./User";

class Event extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        author: PropTypes.number,
    };

    static defaultProps = {
        title: '',
    };

    render() {
        return (
            <div className="b-task">
                <div className="b-task__content">{ this.props.title }</div>
                <h4>Written by: <User id={ this.props.author } /></h4>
            </div>
        );
    }
}

export default Event;
