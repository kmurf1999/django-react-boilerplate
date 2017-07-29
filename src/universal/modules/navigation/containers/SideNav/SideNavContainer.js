import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import SideNav from '../../components/SideNav/SideNav';

@connect(mapStateToProps, mapDispatchToProps)
class SideNavContainer extends Component {

  render() {
    return (<SideNav {...this.props} />);
  }
}

function mapStateToProps(state, props) {
  return {

  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    dispatch,
    // actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default SideNavContainer;
