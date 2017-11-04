import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import User from "./User";
import apiUrls from "../constants/apiUrls";
import {startPostLiking, startPostUnliking, successPostLiking, successPostUnliking} from '../actions/posts';
import {getCookie} from '../utils/getCookie';

class Post extends React.Component {
    static propTypes = {
        id: PropTypes.number,
        author: PropTypes.number,
        text: PropTypes.string,
        created: PropTypes.string,
        likes_count: PropTypes.number,
        liked: PropTypes.bool,
        liked_id: PropTypes.number,
    };

    static defaultProps = {
        text: '',
        likes_count: 0,
        liked: false,
    };

    onClick = (e) => {
        if (this.props.liked) {
            this.props.startPostUnliking(this.props.id);
            fetch(apiUrls.unlike + this.props.liked_id, {
                method: 'DELETE',
                credentials: 'same-origin',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                    'content-type': 'application/json',
                }
            });
        } else {
            this.props.startPostLiking();
            fetch(apiUrls.liked_1 + this.props.id + apiUrls.liked_3, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                    'content-type': 'application/json',
                }
            }).then(
                body => body.json(),
            ).then(
                (json) => {
                    this.props.successPostLiking(json);
                },
            )
        }
    };

    render() {
        let img_src = null;
        if (this.props.liked) {
            img_src = "https://cdn1.iconfinder.com/data/icons/instagram-ui-colored/48/JD-07-32.png";
        } else {
            img_src = "https://cdn2.iconfinder.com/data/icons/instagram-ui/48/jee-68-32.png";
        }
        return (
            <div className="b-task">
                <div className="b-task__content">{this.props.text}</div>
                <h4>Written by: <User id={this.props.author}/></h4>
                <img onClick={this.onClick} className="b-image"
                     src={img_src}/> {this.props.likes_count}
            </div>
        )
    }
}

const mapStateToProps = (ownProps) => {
    return {
        ownProps,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ startPostLiking, successPostLiking, startPostUnliking, successPostUnliking}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
