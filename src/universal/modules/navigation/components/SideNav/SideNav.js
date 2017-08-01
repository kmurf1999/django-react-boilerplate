import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import styles from './SideNav.css'

const SideNav = props => {
  return (
    <Drawer containerStyle={{ top: '64px' }} open={props.menuOpen}>
      <MenuItem onTouchTap={() => props.goToUrl('/')}>Home</MenuItem>
      <MenuItem onTouchTap={() => props.goToUrl('/counter')}>Counter</MenuItem>
      {!props.isAuthenticated ? <MenuItem onTouchTap={() => props.goToUrl('/login')}>Login</MenuItem> : null }
      {!props.isAuthenticated ? <MenuItem onTouchTap={() => props.goToUrl('/signup')}>Signup</MenuItem> : null }
      {props.isAuthenticated ? <MenuItem onTouchTap={() => props.logout()}>Logout</MenuItem> : null }
    </Drawer>
  );
}

export default SideNav;
