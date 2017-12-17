import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {loadUsers} from './../actions/users';
import apiUrls from './../constants/apiUrls';
import Post from './Post'
import {loadPosts} from '../actions/posts';


class PostList extends React.Component {
    static propTypes = {
        isLoading: PropTypes.bool,
        postList: PropTypes.arrayOf(PropTypes.shape(Post.propTypes)),
        loadUsers: PropTypes.func.isRequired,
    };

    static defaultProps = {
        postList: [],
        isLoading: false,
    };

    componentDidMount() {
        this.props.loadPosts(apiUrls.post);
        this.props.loadUsers(apiUrls.user);
    }

    render() {
        if (this.props.isLoading) {
            return <div className="b-task-list">Загрузка...</div>;
        }
        const posts = this.props.postList.sort((first, second) => {
            if (first.id > second.id) {
                return -1;
            } else {
                return 1;
            }
        }).map(
            item => {
                return <Post key={item.id} id={item.id} author={item.author} text={item.text} created={item.created}
                             likes_count={item.likes_count} liked={item.liked} liked_id={item.liked_id}/>
            },
        );
        console.log(posts);
        return (
            <div className="b-task-list">
                <h1>POSTS LIST</h1>
                {posts}
            </div>
        );
    }
}

const mapStateToProps = ({posts}) => {
    return {
        postList: posts.postList,
        isLoading: posts.isLoading,
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({loadPosts, loadUsers}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
