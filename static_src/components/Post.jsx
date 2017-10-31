import React from 'react';
import PropTypes from 'prop-types';

class Post extends React.Component {
    static propTypes = {
        author: PropTypes.number,
        text: PropTypes.string,
    };

    static defaultProps = {
        text: '',
    };

    render() {
        return (
            <div className="b-task">
                <div className="b-task__title">
                    <div className="b-user-name">Author: { this.props.author }</div>
                </div>
                <div className="b-task__content">{ this.props.text }</div>
            </div>
        );
    }
}

export default Post;
