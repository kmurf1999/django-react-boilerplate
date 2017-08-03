import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

import styles from './NavBar.css';

const iconStyle = {
  open: {
    fontSize: "40px",
    background: "none"
  },
  close: {
    fontSize: "40px",
    boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px",
    background: "#EEEEEE",
    borderRadius: "3px"
  }
}

const NavBar = props => {
  return (
    <IconButton iconStyle={props.menuOpen ? iconStyle.open : iconStyle.close} style={{position: "fixed"}} className={styles.appBar} onTouchTap={() => props.actions.toggleMenu(!props.menuOpen)}>
      <FontIcon color={props.menuOpen ? "#E0E0E0" : "#212121"} className="material-icons">{props.menuOpen ? 'close' : 'menu'}</FontIcon>
    </IconButton>
  );
}

export default NavBar;
