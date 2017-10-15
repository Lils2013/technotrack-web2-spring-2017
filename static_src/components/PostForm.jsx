import React from 'react';
import apiUrls from './../constants/apiUrls';


class PostForm extends React.Component {
    state = {
        project_id: 1,
        text: '',
        description: '',
        status: 1,
        isLoading: false,
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onClick = (e) => {
        e.preventDefault();
        if (this.state.isLoading) {
            return;
        }
        this.setState({ isLoading: true });
        fetch(apiUrls.task, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(this.state),
            headers: {
                'content-type': 'application/json',
            }
        }).then(
            body => body.json(),
        ).then(
            (json) => {
                this.setState({ isLoading: false });
                return this.props.onCreate(json);
            },
        )
    }

    render() {
        return (
            <div className="b-create-form">
                <h2>Форма добавления</h2>
                <form>
                    <div className="b-form-field-wrapper">
                        <input onChange={ this.onChange } value={ this.state.text } className="b-form-field" type="text" name="text" placeholder="Заголовок" />
                    </div>
                    <div className="b-form-field-wrapper">
                        <textarea onChange={ this.onChange } value={ this.state.description } className="b-form-field" name="description" placeholder="Текст..." />
                    </div>
                    <div className="b-form-field-wrapper">
                        <button onClick={ this.onClick }>Создать</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default PostForm;
