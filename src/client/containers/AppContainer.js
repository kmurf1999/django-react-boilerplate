import React, {Component, PropTypes} from 'react';
import { ConnectedRouter } from 'react-router-redux';
import {Route} from 'react-router';

// Redux
import { Provider, connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../../universal/modules/auth/ducks/auth';

// Components
import Routes from '../../universal/routes/Routes.js';

@connect(null, mapDispatchToProps)
class AppContainer extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  componentWillMount() {
    // if there is a token in local store, login
    if (window.localStorage) {
      const token = localStorage.getItem('token');
      let user = {};
      try {
        user = JSON.parse(localStorage.getItem('user'))
      } catch (e) {
        // failed to parse
      }

      if (token !== null) {
       this.props.actions.loginSuccess(token, user);
      }
    }
  }

  render () {
    const {
      history
    } = this.props;

    return (
      <ConnectedRouter history={history} >
        <Route render={({location}) => {
          return (<Routes location={location} />)
        }}/>
      </ConnectedRouter>
    ) ;
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    dispatch,
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default AppContainer;
