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
import { withRouter } from 'react-router';

class Main extends React.Component {

    static propTypes = {
        first_name: PropTypes.string,
        username: PropTypes.string,
        loadSelf: PropTypes.func.isRequired,
    };

    static defaultProps = {
        first_name: '',
        username: '',
    };

    componentDidMount() {
        this.props.loadSelf(apiUrls.self);
    }

    render() {
        return (
            <div className="b-wrapper">
                <h1>Hello, {this.props.first_name} </h1>
                <Link to="/">To main</Link>
                <Link to="/posts/">To posts</Link>
                <Link to="/events/">To events</Link>
                <Link to={"/users/" + this.props.id}>To profile</Link>
                <Switch>
                    <Route exact path="/" component={() => <h1>MAIN PAGE</h1>}/>
                    <Route exact path="/posts/" component={PostForm}/>
                    <Route exact path="/events/" component={EventList}/>
                    <Route exact path="/users/:id" component={Profile}/>
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = ({self}) => {
    return {
        ...self.self[0],
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({loadSelf}, dispatch)
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
