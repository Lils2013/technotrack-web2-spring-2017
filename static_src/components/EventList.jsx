import React from 'react';
import PropTypes from 'prop-types';
import Event from './Event';
import bindActionCreators from "redux/es/bindActionCreators";
import connect from "react-redux/es/connect/connect";
import {loadEvents} from './../actions/events';
import {loadUsers} from './../actions/users';
import apiUrls from "../constants/apiUrls";


class EventList extends React.Component {
    static propTypes = {
        isLoading: PropTypes.bool,
        eventList: PropTypes.arrayOf(PropTypes.shape(Event.propTypes)),
        loadUsers: PropTypes.func.isRequired,
        loadEvents: PropTypes.func.isRequired,
    };

    static defaultProps = {
        eventList: [],
        isLoading: false,
    };

    componentDidMount() {
        this.props.loadEvents(apiUrls.event);
        this.props.loadUsers(apiUrls.user);
    }

    render() {
        if (this.props.isLoading) {
            return <div className="b-task-list">Загрузка...</div>;
        }

        const events = this.props.eventList.map(
            item => {
                return <Event key={ item.id } title={ item.title } author={item.author} />
            },
        ).reverse();
        return (
            <div className="b-task-list">
                <h1>EVENTS FEED</h1>
                { events }
            </div>
        );
    }
}
const mapStateToProps = ({events}) => {
    return {
        eventList: events.eventList,
        isLoading: events.isLoading,
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({loadEvents,loadUsers}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
