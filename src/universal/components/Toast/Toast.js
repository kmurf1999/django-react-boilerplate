import React, { Component } from 'react';
import './Toast.scss';


class Toast extends Component {
  state = {
    toasted: false
  };

  componentWillMount() {
    setTimeout(() => {
      this.setState({ toasted: true });
    }, 5000);
  }

  componentWillReceiveProps(nextProps) {
    // If the text prop changes then re-render
    // Or else it will toast every time the props change in any menu item
    if (nextProps.text != this.props.text) {
      this.setState({ toasted: false });
      setTimeout(() => {
        this.setState({ toasted: true });
        console.log('true');
      }, 5000);
    }
  }

  render() {
    if (!this.state.toasted) {
      const { color, text } = this.props;
      return (
        <div style={{backgroundColor: color }} className="toast">
          <h2 className="toast-text">{text}</h2>
        </div>
      );
    }
    return null;
  }
}

export default Toast;
