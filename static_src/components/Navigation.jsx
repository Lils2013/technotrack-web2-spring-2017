import React from 'react';
import PropTypes from 'prop-types';

class Navigation extends React.Component {

    constructor() {
        super();
        this.onClick = this.handleClick.bind(this);
    }

    static propTypes = {
        currentPage: PropTypes.string,
    };

    static defaultProps = {
        currentPage: 'main',
    };

    handleClick(event) {
        const {id} = event.target;
        return this.props.onPageChange(id);
    }

    render() {
        return (
            <div className="b-nav">
                <div id={'main'} onClick={this.onClick} className="b-link">To main</div>
                <div id={'posts'} onClick={this.onClick} className="b-link">To posts</div>
                <div id={'events'} onClick={this.onClick} className="b-link">To events</div>
            </div>
        );
    }
}

export default Navigation;
