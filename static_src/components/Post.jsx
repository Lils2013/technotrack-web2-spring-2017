import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import User from "./User";
import {loadLiked} from "../actions/liked";
import apiUrls from "../constants/apiUrls";

class Post extends React.Component {
    static propTypes = {
        id: PropTypes.number,
        author: PropTypes.number,
        text: PropTypes.string,
        created: PropTypes.string,
        likes_count: PropTypes.number,
        liked: PropTypes.bool,
        // loadLiked: PropTypes.func.isRequired,
    };

    static defaultProps = {
        text: '',
        likes_count: 0,
        liked: false,
    };

    // componentDidMount() {
    //     this.props.loadLiked(apiUrls.liked_1 + this.props.id + apiUrls.liked_2);
    // }

    // onClick = (e) => {
    //     e.preventDefault();
    //     this.props.startPostSending();
    //     fetch(apiUrls.post, {
    //         method: 'POST',
    //         credentials: 'same-origin',
    //         body: JSON.stringify(this.getInputValue()),
    //         headers: {
    //             'X-CSRFToken': getCookie('csrftoken'),
    //             'content-type': 'application/json',
    //         }
    //     }).then(
    //         body => body.json(),
    //     ).then(
    //         (json) => {
    //             this.props.successPostSending(json);
    //         },
    //     )
    // };

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
                <img className="b-image"
                     src={img_src}/> {this.props.likes_count}
            </div>
        )
    }
}

// const mapStateToProps = ({liked},ownProps) => {
//     console.log(liked.liked[1]);
//     return {
//         ...ownProps,
//         liked: liked.liked[ownProps-1],
//     }
// };
//
// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators({loadLiked}, dispatch)
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Post);
export default Post;
