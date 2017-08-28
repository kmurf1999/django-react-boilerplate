import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {
  green300, grey100, grey300
} from 'material-ui/styles/colors';

import './NavBar.scss';

const iconStyle = {
  open: {
    fontSize: "40px",
    background: "rgba(0,0,0,0)",
    borderRadius: "50%"
  },
  close: {
    fontSize: "40px",
    boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px",
    borderRadius: "3px",
    background: green300
  }
}

const NavBar = props => {
  return (
    <div>
      <h1 className="brand-name">Django React</h1>
      <IconButton iconStyle={props.menuOpen ? iconStyle.open : iconStyle.close} style={{position: "fixed"}} className="appBar" onTouchTap={() => props.actions.toggleMenu(!props.menuOpen)}>
        <FontIcon color={props.menuOpen ? grey300 : grey100} className="material-icons hamburger">{props.menuOpen ? 'close' : 'menu'}</FontIcon>
      </IconButton>
    </div>
  );
}

export default NavBar;
