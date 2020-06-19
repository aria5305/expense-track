import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/action/index';

class Logout extends Component {
    componentDidMount () {
        this.props.onLogout();
        this.props.onClearState();
    }

    render () {
        return <Redirect to="/"/>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout()),
        onClearState: () => dispatch(actions.clearState())
    };
};

export default connect(null, mapDispatchToProps)(Logout);