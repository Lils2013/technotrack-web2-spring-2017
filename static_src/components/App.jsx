import React from 'react';
import PostList from './PostList';
import PostForm from './PostForm';
import apiUrls from './../constants/apiUrls';
import './../styles/base.scss';

class App extends React.Component {
    state = {
        postList: [],
        isLoading: false,
    };

    componentDidMount() {
        this.setState({isLoading: true});
        fetch(apiUrls.post, {
            credentials: 'include',
        }).then(
            body => {
                return body.json()
            },
        ).then(
            json => this.setState({postList: json.results, isLoading: false}),
        );
    }

    onPostCreate = (post) => {
        this.setState({
            postList: [post, ...this.state.postList],
        });
    };

    render() {
        return (
            <div className="b-wrapper">
                <h1>A WEBSITE</h1>
                <PostForm onCreate={this.onPostCreate}/>
                <PostList isLoading={this.state.isLoading} postList={this.state.postList}/>
            </div>
        );
    }
}

export default App;
