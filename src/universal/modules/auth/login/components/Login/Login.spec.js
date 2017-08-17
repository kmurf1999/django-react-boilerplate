/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import TextField from 'material-ui/TextField';


import Login from './Login';

describe('Login (Component):', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Login />);
  });

  it('should render correctly', () => {
    return expect(wrapper).to.be.ok;
  });


});
