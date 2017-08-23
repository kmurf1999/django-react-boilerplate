import React, {Component, PropTypes} from 'react';
import './Counter.scss';
import classNames from 'classnames';

class Counter extends Component {

  static propTypes = {
    incrementCount: PropTypes.func.isRequired,
    decrementCount: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired
  }

  handleLinkClick(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  handleIncrementClick (incrementCount, event) {
    this.handleLinkClick(event);
    incrementCount();
  }

  handleDecrementClick(decrementCount, event) {
    this.handleLinkClick(event);
    decrementCount();
  }

  render () {
    const {
      count,
      incrementCount,
      decrementCount
    } = this.props;

    return (
      <div className={"counterContainer"}>
        <div className={"counter"}>{count}</div>
        <a className={classNames("button", "positive")} onClick={this.handleIncrementClick.bind(this, incrementCount)}>+</a>
        <a className={classNames("button", "negative")} onClick={this.handleDecrementClick.bind(this, decrementCount)}>-</a>
      </div>
    )
  }
}

export default Counter;
