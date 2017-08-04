/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Home from './Home';

describe('Home (Component):', () => {
  context('Empty state:', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<Home />);
    });

    it('should render correctly', () => {
      return expect(wrapper).to.be.ok;
    });

    it('should have one h1', () => {
        expect(wrapper.find('h1')).to.have.length(1);
    });
  });
});
