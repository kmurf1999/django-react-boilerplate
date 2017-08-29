import React, { Component, PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import {
  grey300
} from 'material-ui/styles/colors';

import './SideNav.scss'


class MenuButton extends Component {
  constructor(props) {
    super(props);

    this.hover = this.hover.bind(this);
    this.defaultColor = this.defaultColor.bind(this);
  }

  static PropTypes = {
    color: PropTypes.string,
    path: PropTypes.string,
    label: PropTypes.string,
    goToUrl: PropTypes.func
  };

  componentWillReceiveProps() {
    this.setState({ color: this.defaultColor(), borderColor: this.defaultBorderColor() });
  }

  defaultColor() {
    return this.props.path === this.props.url ? this.props.color : grey300;
  }

  defaultBorderColor() {
    return this.props.path === this.props.url ? this.props.color : "transparent";
  }

  state = {
    color: this.defaultColor(),
    borderColor: this.defaultBorderColor()
  };

  hover(isHovering) {
    if (isHovering) {
      this.setState({ color: this.props.color, borderColor: this.props.color});
    } else {
      this.setState({ color: this.defaultColor(), borderColor: this.defaultBorderColor()});
    }
  }

  render() {
    const { url, goToUrl, color, label } = this.props;
    return (
      <div>
        <button style={{color: this.state.color}} onMouseEnter={() => this.hover(true)} onMouseLeave={() => this.hover(false)} onTouchTap={() => goToUrl(url)} className="menuButton">{label}</button>
        <div className="menu-highlight" style={{ backgroundColor: `${this.state.borderColor}`}}/>
      </div>
    );
  }
}

const SideNav = props => {
  return (
    <Drawer containerClassName="side-nav"
      open={props.menuOpen}
      docked={false}
      overlayClassName="overlay"
      onRequestChange={open => props.actions.toggleMenu(!props.menuOpen)}
    >
      <MenuButton path={props.path} color="#2196F3" goToUrl={props.goToUrl} url='/' label="Home"/>
      <MenuButton path={props.path} color="#00BCD4" goToUrl={props.goToUrl} url='/counter' label="Counter"/>
      {!props.isAuthenticated ? <MenuButton path={props.path} color="#4CAF50" goToUrl={props.goToUrl} url='/login' label="Login"/> : null }
      {!props.isAuthenticated ? <MenuButton path={props.path} color="#CDDC39" goToUrl={props.goToUrl} url='/signup' label="Signup"/> : null }
      {props.isAuthenticated ? <MenuButton path={props.path} color="#4CAF50" goToUrl={props.goToUrl} url='/logout' label="Logout"/> : null }
    </Drawer>
  );
}

export default SideNav;
