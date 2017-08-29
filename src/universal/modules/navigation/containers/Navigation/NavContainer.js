import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {withRouter} from "react-router-dom";
import {
  green300
} from 'material-ui/styles/colors';

import SideNav from '../../components/SideNav/SideNav';
import NavBar from '../../components/NavBar/NavBar';
import Toast from '../../../../components/Toast/Toast';
import * as actionCreators from '../../ducks/navigation';
import {logout, LOGOUT} from '../../../auth/ducks/auth';

@connect(mapStateToProps, mapDispatchToProps)
class NavContainer extends Component {
  constructor(props) {
    super(props);

    this.goToUrl = this.goToUrl.bind(this);
  }

  goToUrl(url) {
    if (url === '/logout') {
      this.props.dispatch(logout());
    } else {
      this.props.history.push(url);
    }
    this.props.actions.toggleMenu(false);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <NavBar {...this.props} />
          <SideNav path={this.props.location.pathname || '/'} {...this.props} goToUrl={this.goToUrl}/>
          { this.props.toast ? <Toast text={this.props.toast.text} color={green300}/> : null }
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
    toast: state.auth.toast
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    dispatch,
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default withRouter(NavContainer);
