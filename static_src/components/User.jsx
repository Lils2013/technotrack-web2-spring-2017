import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import {loadUsers} from "../actions/users";
import {Link} from 'react-router-dom';


class User extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        first_name: PropTypes.string,
        username: PropTypes.string,
        loadUsers: PropTypes.func.isRequired,
    };

    static defaultProps = {
        first_name: '',
        username: '',
    };

    render() {
        return (
            <div className="b-task__title">
                <Link to={"/users/" + this.props.id} > {this.props.username} </Link>
            </div>
        );
    }
}

const mapStateToProps = ({ users }, ownProps) => {
    return {
        ...users.users[ownProps.id-1],
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({loadUsers}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(User);