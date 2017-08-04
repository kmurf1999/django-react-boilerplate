import fetch from 'isomorphic-fetch'

import { createReducer } from '../../../utils/utils';


export const MENU_TOGGLE = 'MENU_TOGGLE';


const initialState = {
  menuOpen: false
};

export default createReducer(initialState, {
    [MENU_TOGGLE]: (state, payload) => {
      return Object.assign({}, state, {
        menuOpen: payload.menuOpen
      });
    },
});

export function toggleMenu(menuOpen) {
  return {
    type: MENU_TOGGLE,
    payload: {
      menuOpen
    }
  };
}
