import React from 'react';
import PostList from './PostList';
import PostForm from './PostForm';
import EventList from './EventList';
import Navigation from './Navigation'
import apiUrls from './../constants/apiUrls';
import './../styles/base.scss';

const EVENT_LIST = [
    {id: 0, title: 'event'},
    {id: 1, title: 'e vent'},
    {id: 2, title: 'ev ent'},
    {id: 3, title: 'even t'},
];

class App extends React.Component {
    state = {
        postList: [],
        isLoading: false,
        currentPage: 'main',
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
            json => {
                return this.setState({postList: json, isLoading: false})
            },
        );
    }

    onPostCreate = (post) => {
        this.setState({
            postList: [post, ...this.state.postList],
        });
    };

    onPageChange = (page) => {
        this.setState({
            currentPage: page,
        });
    };

    render() {
        if (this.state.currentPage === 'posts') {
            return (
                <div className="b-wrapper">
                    <Navigation onPageChange={this.onPageChange}/>
                    <h1>POSTS</h1>
                    <PostForm onCreate={this.onPostCreate}/>
                    <PostList isLoading={this.state.isLoading} postList={this.state.postList}/>
                </div>
            );
        } else if (this.state.currentPage === 'main') {
            return (
                <div className="b-wrapper">
                    <Navigation onPageChange={this.onPageChange}/>
                    <h1>MAIN PAGE</h1>
                </div>
            );
        } else if (this.state.currentPage === 'events') {
            return (
                <div className="b-wrapper">
                    <Navigation onPageChange={this.onPageChange}/>
                    <h1>EVENTS</h1>
                    <EventList isLoading={this.state.isLoading} eventList={EVENT_LIST}/>
                </div>
            );
        } else {
            return (
                <div className="b-wrapper">
                    <Navigation onPageChange={this.onPageChange}/>
                    <h1>WHATEVER</h1>
                </div>
            );
        }
    }
}

export default App;
