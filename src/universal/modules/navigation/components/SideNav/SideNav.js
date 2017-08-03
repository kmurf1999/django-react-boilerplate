import React, { Component, PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';


import styles from './SideNav.css'

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
    this.setState({ color: this.defaultColor()});
  }

  defaultColor() {
    return this.props.path === this.props.url ? this.props.color : "#fff"
  }

  state = {
    color: this.defaultColor()
  };

  hover(isHovering) {
    if (isHovering) {
      this.setState({ color: this.props.color});
    } else {
      this.setState({ color: this.defaultColor()});
    }
  }

  render() {
    const { url, goToUrl, color, label } = this.props;
    return (
      <button style={{color: this.state.color}} onMouseEnter={() => this.hover(true)} onMouseLeave={() => this.hover(false)} onTouchTap={() => goToUrl(url)} className={styles.menuButton}>{label}</button>
    );
  }
}


const LogoutButton = props => {
  return (
    <button onTouchTap={() => props.logout()} className={styles.logoutButton}>{props.label}</button>
  );
}

const SideNav = props => {
  return (
    <div className={props.menuOpen ? styles.navOpen : styles.navClose}>
      <MenuButton path={props.path} color="#2196F3" goToUrl={props.goToUrl} url='/' label="Home"/>
      <MenuButton path={props.path} color="#00BCD4" goToUrl={props.goToUrl} url='/counter' label="Counter"/>
      {!props.isAuthenticated ? <MenuButton path={props.path} color="#4CAF50" goToUrl={props.goToUrl} url='/login' label="Login"/> : null }
      {!props.isAuthenticated ? <MenuButton path={props.path} color="#CDDC39" goToUrl={props.goToUrl} url='/signup' label="Signup"/> : null }
      {props.isAuthenticated ? <LogoutButton path={props.path} color="#4CAF50" logout={props.logout} label="Logout"/> : null }
    </div>
  );
}

export default SideNav;
