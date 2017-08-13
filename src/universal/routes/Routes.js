// Libraries
import React, {Component, PropTypes} from  'react';
import {Route, Redirect} from 'react-router';

// Routes
import * as RouteMap from '../routes/static.js';

// Containers
import AppContainer from '../containers/App/AppContainer.js';
// import PrivateRouteContainer from 'universal/containers/PrivateRoute/PrivateRouteContainer.js';

class Routes extends Component {
  render () {
    const { location } = this.props;

    return (
      <AppContainer>
          <Route location={location} path='*' component={RouteMap.Navigation}/>
          <Route exact location={location} path='/' component={RouteMap.Home} />
          <Route exact location={location} path='/counter' component={RouteMap.Counter} />
          <Route exact location={location} path='/login' component={RouteMap.Login} />
          <Route exact location={location} path='/signup' component={RouteMap.Signup} />
      </AppContainer>
    );
  }
}

export default Routes;
