import React from 'react';
import PropTypes from 'prop-types';
import User from "./User";

class Post extends React.Component {
    static propTypes = {
        author: PropTypes.number,
        text: PropTypes.string,
        created: PropTypes.string,
    };

    static defaultProps = {
        text: '',
    };

    render() {
        return (
            <div className="b-task">
                <div className="b-task__content">{ this.props.text }</div>
                <h4>Written by: <User id={ this.props.author } /></h4>
            </div>
        );
    }
}

export default Post;
