import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {loadUsers} from "../actions/users";
import apiUrls from "../constants/apiUrls";
import User from "./User"
import {loadSubscribed} from "../actions/subscribed";


class Profile extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        first_name: PropTypes.string,
        username: PropTypes.string,
        subscribedList: PropTypes.arrayOf(PropTypes.shape(User.propTypes)),
        loadSubscribed: PropTypes.func.isRequired,
        isLoading: PropTypes.bool,
    };

    static defaultProps = {
        subscribedList: [],
        first_name: '',
        username: '',
    };

    componentDidMount() {
        this.props.loadSubscribed(apiUrls.subscribed + "?username=" + this.props.username);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.id !== this.props.id) {
            this.props.loadSubscribed(apiUrls.subscribed + "?username=" + nextProps.username);
        }
    }

    render() {
        if (this.props.isLoading) {
            return <div className="b-task-list">Загрузка...</div>;
        }
        const subscribed = this.props.subscribedList.map(
            item => {
                return <User key={item.target} id={item.target}/>
            },
        ).reverse();
        return (
            <div>
                <h1>PROFILE</h1>
                <h2>{this.props.username}</h2>
                <div className="b-task-list">
                    <h1>IS SUBSCRIBED TO</h1>
                    {subscribed}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({users, subscribed}, ownProps) => {
    return {
        ...users.users[ownProps.match.params.id - 1],
        subscribedList: subscribed.subscribedList,
        isLoading: subscribed.isLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({loadSubscribed}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);