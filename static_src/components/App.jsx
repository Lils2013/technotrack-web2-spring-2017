import React from 'react';
import PostList from './PostList';
import PostForm from './PostForm';
import EventList from './EventList';
import Navigation from './Navigation'
import apiUrls from './../constants/apiUrls';
import './../styles/base.scss';
import {Link, Route, Switch} from "react-router-dom";

const EVENT_LIST = [
    {id: 0, title: 'evehhhnt'},
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
                return this.setState({postList: json.reverse(), isLoading: false})
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
        return (
            <div className="b-wrapper">
                <Link to="/">To main</Link>
                <Link to="/posts/">To posts</Link>
                <Switch>
                    <Route exact path="/" component={ () => <h1>MAIN PAGE</h1> } />
                    <Route
                        exact
                        path="/create/"
                        render={ props => <PostForm { ...props } onCreate={ this.onPostCreate } />}
                    />
                    <Route exact path="/posts/" component={ PostList } />
                </Switch>
                {/*if (this.state.currentPage === 'posts') {*/}
                {/*return (*/}
                {/*<div className="b-wrapper">*/}
                {/*<Navigation onPageChange={this.onPageChange}/>*/}
                {/*<h1>POSTS</h1>*/}
                {/*<PostForm onCreate={this.onPostCreate}/>*/}
                {/*<PostList isLoading={this.state.isLoading} postList={this.state.postList}/>*/}
                {/*</div>*/}
                {/*);*/}
            {/*} else if (this.state.currentPage === 'main') {*/}
                {/*return (*/}
                {/*<div className="b-wrapper">*/}
                {/*<Navigation onPageChange={this.onPageChange}/>*/}
                {/*<h1>MAIN PAGE</h1>*/}
                {/*</div>*/}
                {/*);*/}
            {/*} else if (this.state.currentPage === 'events') {*/}
                    {/*return (*/}
                        {/*<div className="b-wrapper">*/}
                            {/*<Navigation onPageChange={this.onPageChange}/>*/}
                            {/*<h1>EVENTS</h1>*/}
                            {/*<EventList isLoading={this.state.isLoading} eventList={EVENT_LIST}/>*/}
                        {/*</div>*/}
                    {/*);*/}
                {/*} else {*/}
                    {/*return (*/}
                        {/*<div className="b-wrapper">*/}
                            {/*<Navigation onPageChange={this.onPageChange}/>*/}
                            {/*<h1>WHATEVER</h1>*/}
                        {/*</div>*/}
                    {/*);*/}
                {/*}*/}
            </div>
        )
    }
}

export default App;
