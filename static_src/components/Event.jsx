import React from 'react';
import PropTypes from 'prop-types';

class Event extends React.Component {
    static propTypes = {
        title: PropTypes.string,
    };

    static defaultProps = {
        title: '',
    };

    render() {
        return (
            <div className="b-task">
                <div className="b-task__content">{ this.props.title }</div>
            </div>
        );
    }
}

export default Event;
