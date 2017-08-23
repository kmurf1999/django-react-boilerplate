import React, {Component, PropTypes} from 'react';

import '../../styles/base.scss';

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render () {
    return (
      <div className="app">
        {this.props.children}
      </div>
    );
  }
}

export default App;
