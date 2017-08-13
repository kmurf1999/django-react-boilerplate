/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import App from './App';

describe('App (Component):', () => {
  let wrapper;
  const props = {
    children: <div className="test-test"/>
  };

  beforeEach(() => {
    wrapper = shallow(<App {...props}/>);
  });

  it('should render correctly', () => {
    return expect(wrapper).to.be.ok;
  });
});
