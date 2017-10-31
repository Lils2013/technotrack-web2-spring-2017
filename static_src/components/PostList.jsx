import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadPosts } from './../actions/posts';
import apiUrls from './../constants/apiUrls';


class PostList extends React.Component {
    static propTypes = {
        isLoading: PropTypes.bool,
        postList: PropTypes.arrayOf(PropTypes.shape(Post.propTypes)),
        loadTasks: PropTypes.func.isRequired,
    };

    static defaultProps = {
        postList: [],
        isLoading: false,
    };

    componentDidMount() {
        this.props.loadTasks(apiUrls.task);
    }

    render() {
        if (this.props.isLoading) {
            return <div className="b-task-list">Загрузка...</div>;
        }
        const posts = this.props.postList.map(
            item => {
                return <Post key={ item.id } author={ item.author } text={ item.text } />
            },
        );
        return (
            <div className="b-task-list">
                <h1>POSTS LIST</h1>
                { posts }
            </div>
        );
    }
}

export default PostList;
