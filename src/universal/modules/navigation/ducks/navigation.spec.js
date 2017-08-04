import { expect } from 'chai';

import * as DUCKS from './navigation';

describe('Navigation Actions:', () => {

  it('toggleMenu creates MENU_TOGGLE action', () => {
    expect(DUCKS.toggleMenu(false)).to.eql({
      type: DUCKS.MENU_TOGGLE,
      payload: {
        menuOpen: false
      }
    });
  });

});
