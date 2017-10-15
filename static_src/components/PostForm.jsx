import React from 'react';
import apiUrls from './../constants/apiUrls';


class PostForm extends React.Component {
    state = {
        text: '',
        isLoading: false,
    };

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    onClick = (e) => {
        e.preventDefault();
        if (this.state.isLoading) {
            return;
        }
        this.setState({isLoading: true});
        fetch(apiUrls.post, {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify(this.state),
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'content-type': 'application/json',
            }
        }).then(
            body => body.json(),
        ).then(
            (json) => {
                this.setState({isLoading: false});
                return this.props.onCreate(json);
            },
        )
    };


    render() {
        return (
            <div className="b-create-form">
                <h2>Posts form</h2>
                <form>
                    <div className="b-form-field-wrapper">
                        <input onChange={this.onChange} value={this.state.text} className="b-form-field" type="text"
                               name="text" placeholder="Text"/>
                    </div>
                    <div className="b-form-field-wrapper">
                        <button onClick={this.onClick}>Create post</button>
                    </div>
                </form>
            </div>
        );
    }
}

function getCookie(name) {
    let value = '; ' + document.cookie;
    let parts = value.split('; ' + name + '=');
    if (parts.length === 2) return parts.pop().split(";").shift();
}

export default PostForm;