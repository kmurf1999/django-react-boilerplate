import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { formValueSelector } from 'redux-form'
import { bindActionCreators } from 'redux';

import Signup from '../../components/Signup/Signup';
import * as actionCreators from '../../../ducks/auth';

@connect(mapStateToProps, mapDispatchToProps)
class SignupContainer extends Component {
  static PropTypes = {
    handleSubmit: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    statusText: PropTypes.string
  };

  static defaultProps = {
    statusText: ''
  };

  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  handleSubmit(e, username, password) {
    e.preventDefault();
    e.stopPropagation();
    this.props.actions.signup(username, password);
  }

  render() {
    return (<Signup {...this.props} handleSubmit={this.handleSubmit.bind(this)}/>);
  }
}

function mapStateToProps(state, props) {
  const selector = formValueSelector('signup');
  return {
    isAuthenticated: state.auth.isAuthenticated,
    username: selector(state, 'username'),
    password: selector(state, 'password'),
    statusText: state.auth.statusText
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    dispatch,
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default SignupContainer;
