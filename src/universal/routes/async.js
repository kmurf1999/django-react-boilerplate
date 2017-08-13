import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';

function asyncRoute(getComponent) {
  return class AsyncComponent extends React.Component {
    state = {
      Component: null
    };

    componentDidMount() {
      if ( this.state.Component === null ) {
        getComponent().then((Component) => {
          this.setState({Component: Component});
        })
      }
    }

    render() {
      const {
        Component
      } = this.state;

      if ( Component ) {
        return (
          <Component {...this.props} />
        );
      }
      return (
        <MuiThemeProvider>
          <CircularProgress/>
        </MuiThemeProvider>
      );
    }
  }
}

export const Home = asyncRoute(() => {
  return System.import('../components/Home/Home.js');
});

export const Counter = asyncRoute(() => {
  return System.import('../modules/counter/containers/Counter/CounterContainer.js');
});

export const Login = asyncRoute(() => {
  return System.import('../modules/auth/login/containers/Login/LoginContainer');
});

export const Signup = asyncRoute(() => {
  return System.import('../modules/auth/signup/containers/Signup/SignupContainer');
});

export const Navigation = asyncRoute(() => {
  return System.import('../modules/navigation/containers/Navigation/NavContainer');
});
