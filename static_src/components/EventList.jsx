import React from 'react';
import PropTypes from 'prop-types';
import Event from './Event';


class EventList extends React.Component {
    static propTypes = {
        isLoading: PropTypes.bool,
        eventList: PropTypes.arrayOf(PropTypes.shape(Event.propTypes)),
    };

    static defaultProps = {
        eventList: [],
        isLoading: false,
    };

    render() {
        if (this.props.isLoading) {
            return <div className="b-task-list">Загрузка...</div>;
        }

        const events = this.props.eventList.map(
            item => {
                return <Event key={ item.id } title={ item.title } />
            },
        );
        return (
            <div className="b-task-list">
                { events }
            </div>
        );
    }
}

export default EventList;
