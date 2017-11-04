import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {loadUsers} from './../actions/users';
import apiUrls from './../constants/apiUrls';
import Post from './Post'
import {startPostLoading, successPostLoading} from '../actions/posts';


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
        this.props.loadUsers(apiUrls.user);
        let payload;
        this.props.startPostLoading();
        fetch(apiUrls.post, {
            method: 'GET',
            credentials: 'include',
        }).then(
            body => body.json(),
        ).then(
            (json) => {
                const lol = json.reverse().map(item => {
                    fetch(apiUrls.liked_1 + item.id + apiUrls.liked_2, {
                        method: 'GET',
                        credentials: 'include',
                    }).then(
                        body => body.json(),
                    ).then(
                        (json) => {
                            item['liked'] = json.liked;
                            item['liked_id']=json.liked_id;
                            this.props.successPostLoading(item);
                        },
                    );
                },);
            },
        );
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
    return bindActionCreators({startPostLoading, successPostLoading, loadUsers}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
