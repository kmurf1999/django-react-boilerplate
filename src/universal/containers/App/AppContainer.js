import React, {Component, PropTypes} from 'react';
import App from '../../components/App/App';

class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render () {
    return (
      <App {...this.props} />
    );
  }
}

export default AppContainer;
