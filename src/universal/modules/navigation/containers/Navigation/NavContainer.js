import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {withRouter} from "react-router-dom";

import SideNav from '../../components/SideNav/SideNav';
import NavBar from '../../components/NavBar/NavBar';
import * as actionCreators from '../../ducks/navigation';
import {logout, LOGOUT} from 'universal/modules/auth/ducks/auth';

@connect(mapStateToProps, mapDispatchToProps)
class NavContainer extends Component {
  constructor(props) {
    super(props);

    this.goToUrl = this.goToUrl.bind(this);
    this.logout = this.logout.bind(this);
  }

  goToUrl(url) {
    this.props.history.push(url);
    this.props.actions.toggleMenu(false);
  }

  logout() {
    this.props.dispatch(logout());
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <NavBar {...this.props} />
          <SideNav path={this.props.location.pathname || '/'} {...this.props} goToUrl={this.goToUrl} logout={this.logout}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    menuOpen: state.menu.menuOpen,
    username: state.auth.user.username,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    dispatch,
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default withRouter(NavContainer);
