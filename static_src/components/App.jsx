import React from 'react';
import PostForm from './PostForm';
import './../styles/base.scss';
import {Link, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {loadUsers} from "../actions/users";
import apiUrls from "../constants/apiUrls";
import PropTypes from 'prop-types';

class App extends React.Component {
    render() {
        return (
            <div className="b-wrapper">
                <Link to="/">To main</Link>
                <Link to="/posts/">To posts</Link>
                <Switch>
                    <Route exact path="/" component={() => <h1>MAIN PAGE</h1>}/>
                    <Route exact path="/posts/" render={
                        (props) =>
                            <PostForm {...props}/>
                    }/>
                </Switch>
            </div>
        )
    }
}

export default App
