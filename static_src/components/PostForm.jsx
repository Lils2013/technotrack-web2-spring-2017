import React from 'react';
import apiUrls from './../constants/apiUrls';
import './../styles/base.scss';
import PostList from "./PostList";
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {startPostSending, successPostSending} from "../actions/posts";


class PostForm extends React.Component {

    static propTypes = {
        isLoading: PropTypes.bool,
        // sendPosts: PropTypes.func.isRequired,
    };

    static defaultProps = {
        isLoading: false,
    };

    // onClick = (e) => {
    //     e.preventDefault();
    //     if (this.state.isLoading) {
    //         return;
    //     }
    //     // this.setState({isLoading: true});
    //     fetch(apiUrls.post, {
    //         method: 'POST',
    //         credentials: 'same-origin',
    //         body: JSON.stringify(this.state),
    //         headers: {
    //             'X-CSRFToken': getCookie('csrftoken'),
    //             'content-type': 'application/json',
    //         }
    //     }).then(
    //         body => body.json(),
    //     ).then(
    //         (json) => {
    //             // this.setState({isLoading: false});
    //             return this.props.onCreate(json);
    //         },
    //     )
    // };

    getInputValue() {
        return {['text']: this.refs.text.value}
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.startPostSending();
        fetch(apiUrls.post, {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify(this.getInputValue()),
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'content-type': 'application/json',
            }
        }).then(
            body => body.json(),
        ).then(
            (json) => {
                this.props.successPostSending(json);
            },
        )
    };

    render() {
        return (
            <div className="b-create-form">
                <h1>Posts form</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="b-form-field-wrapper">
                        <input className="b-form-field" type="text" placeholder="Text" ref="text"/>
                    </div>
                    <div className="b-form-field-wrapper">
                        <button type="submit">Create post</button>
                    </div>
                </form>
                <PostList/>
            </div>
        );
    }

}

function getCookie(name) {
    let value = '; ' + document.cookie;
    let parts = value.split('; ' + name + '=');
    if (parts.length === 2) return parts.pop().split(";").shift();
}

const mapStateToProps = ({posts}) => {
    return {
        isLoading: posts.isLoading,
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({startPostSending, successPostSending}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
