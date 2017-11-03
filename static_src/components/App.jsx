import React from 'react';
import PropTypes from 'prop-types';
import PostForm from './PostForm';
import EventList from './EventList';
import Profile from './Profile';
import './../styles/base.scss';
import {bindActionCreators} from "redux";
import {Link, Route, Switch} from "react-router-dom";
import {loadSelf} from "../actions/self";
import apiUrls from "../constants/apiUrls";
import { connect } from 'react-redux';
import Main from "./Main";

class App extends React.Component {
    render() {
        return (
            <Main/>
        )
    }
}

export default App;
