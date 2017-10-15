import React from 'react';
import PropTypes from 'prop-types';

class Task extends React.Component {
    static propTypes = {
        author: PropTypes.shape({
            avatar: PropTypes.string,
            first_name: PropTypes.string,
        }).isRequired,
        text: PropTypes.string,
    }

    static defaultProps = {
        text: '',
    }

    render() {
        return (
            <div className="b-task">
                <div className="b-task__title">
                    <img
                        className="b-avatar"
                        width="40px"
                        height="40px"
                        src={ this.props.author.avatar }
                        
                    />
                    <div className="b-user-name">{ this.props.author.first_name }</div>
                </div>
                <div className="b-task__content">{ this.props.text }</div>
            </div>
        );
    }
}

export default Task;
