import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

import styles from './NavBar.css';

const NavBar = props => {
  return (
    <div>
      <AppBar className={styles.appBarShow}
        title={props.isAuthenticated ? props.username : "Django-React"}
        iconElementLeft={<IconButton><FontIcon className="material-icons">{props.menuOpen ? 'arrow_back' : 'menu'}</FontIcon></IconButton>}
        onLeftIconButtonTouchTap={() => props.actions.toggleMenu(!props.menuOpen)}
      />
    </div>
  );
}

export default NavBar;
