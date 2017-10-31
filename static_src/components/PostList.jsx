import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';


class PostList extends React.Component {
    static propTypes = {
        isLoading: PropTypes.bool,
        postList: PropTypes.arrayOf(PropTypes.shape(Post.propTypes)),
    };

    static defaultProps = {
        postList: [],
        isLoading: false,
    };

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
