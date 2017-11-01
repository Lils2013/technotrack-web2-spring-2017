import React from 'react';
import PostForm from './PostForm';
import EventList from './EventList';
import './../styles/base.scss';
import {Link, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";

class App extends React.Component {
    render() {
        return (
            <div className="b-wrapper">
                <Link to="/">To main</Link>

                <Link to="/posts/">To posts</Link>

                <Link to="/events/">To events</Link>
                <Switch>
                    <Route exact path="/" component={() => <h1>MAIN PAGE</h1>}/>
                    <Route exact path="/posts/" component={PostForm}/>
                    <Route exact path="/events/" component={EventList}/>
                </Switch>
            </div>
        )
    }
}

export default App
