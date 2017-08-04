/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import { expect } from 'chai';
import nock from 'nock';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { SERVER_URL } from '../../../utils/config';
import * as DUCKS from './auth.js';


describe('Auth Actions:', () => {

  describe('Signup Actions:', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    beforeEach(() => {
      localStorage.removeItem('token');
    });

    it('signupSuccess should create SIGNUP_SUCCESS action', () => {
      expect(DUCKS.signupSuccess('0121f44d1b62d950280a5df81eb474e0ab33725c72c6b685f0da1ecd8f090d56', {})).to.eql({
        type: DUCKS.SIGNUP_SUCCESS,
        payload: {
          token: '0121f44d1b62d950280a5df81eb474e0ab33725c72c6b685f0da1ecd8f090d56',
          user: {}
        }
      });
    });

    it('signupFailure should create SIGNUP_FAILURE action', () => {
      expect(DUCKS.signupFailure(404, 'Not Found')).to.eql({
        type: DUCKS.SIGNUP_FAILURE,
        payload: {
          errorCode: 404,
          errorMessage: 'Not Found'
        }
      });
    });

    it('signupRequest should create SIGNUP_REQUEST action', () => {
      expect(DUCKS.signupRequest()).to.eql({
        type: DUCKS.SIGNUP_REQUEST
      });
    });

    it('signup should create SIGNUP_REQUEST, SIGNUP_SUCCESS, ' +
    'actions when API returns 200', (done) => {
      const expectedActions = [
        {
          type: DUCKS.SIGNUP_REQUEST
        },
        {
          type: DUCKS.SIGNUP_SUCCESS,
          payload: {
            token: '0121f44d1b62d950280a5df81eb474e0ab33725c72c6b685f0da1ecd8f090d56',
            user: {}
          }
        }
      ];

      nock(SERVER_URL)
      .post('/api/accounts/register/')
      .reply(200, {
        token: '0121f44d1b62d950280a5df81eb474e0ab33725c72c6b685f0da1ecd8f090d56',
        user: {}
      });

      const middlewares = [thunk];
      const mockStore = configureStore(middlewares);
      const store = mockStore({});

      store.dispatch(DUCKS.signup())
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      }).then(done).catch(done);
    });

    it('signup should create SIGNUP_REQUEST and SIGNUP_FAILURE when API returns 401', (done) => {
      const expectedActions = [
        {
          type: DUCKS.SIGNUP_REQUEST
        }, {
          type: DUCKS.SIGNUP_FAILURE,
          payload: {
            errorCode: 'Connection Error',
            errorMessage: 'An error occurred while sending your data!'
          }
        }
      ];

      nock(SERVER_URL)
      .post('/api/accounts/register/')
      .reply('Connection Error', 'An error occurred while sending your data!');

      const middlewares = [thunk];
      const mockStore = configureStore(middlewares);
      const store = mockStore({});

      store.dispatch(DUCKS.signup())
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      }).then(done).catch(done);
    });

    it('signup should create SIGNUP_REQUEST and SIGNUP_FAILURE actions when API ' +
    'has no response', (done) => {
      const expectedActions = [
        {
          type: DUCKS.SIGNUP_REQUEST
        }, {
          type: DUCKS.SIGNUP_FAILURE,
          payload: {
            errorCode: 'Connection Error',
            errorMessage: 'An error occurred while sending your data!'
          }
        }
      ];

      nock(SERVER_URL)
      .post('/api/v1/accounts/register/')
      .reply();

      const middlewares = [thunk];
      const mockStore = configureStore(middlewares);
      const store = mockStore({});

      store.dispatch(DUCKS.signup())
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      }).then(done).catch(done);
    });
  });

  describe('Login, Logout Actions:', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    beforeEach(() => {
      localStorage.removeItem('token');
    });

    it('loginSuccess should create LOGIN_SUCCESS action', () => {
      expect(DUCKS.loginSuccess('token', {})).to.eql({
        type: DUCKS.LOGIN_SUCCESS,
        payload: {
          token: 'token',
          user: {}
        }
      });
    });

    it('loginFailure should create LOGIN_FAILURE action', () => {
      expect(DUCKS.loginFailure(404, 'Not Found')).to.eql({
        type: DUCKS.LOGIN_FAILURE,
        payload: {
          errorCode: 404,
          errorMessage: 'Not Found'
        }
      });
    });

    it('loginRequest should create LOGIN_REQUEST action', () => {
      expect(DUCKS.loginRequest()).to.eql({
        type: DUCKS.LOGIN_REQUEST
      });
    });

    it('logout should create LOGOUT action', () => {
      expect(DUCKS.logout()).to.eql({
        type: DUCKS.LOGOUT
      });
    });

    it('login should create LOGIN_REQUEST, LOGIN_SUCCESS, ' +
    'actions when API returns 200', (done) => {
      const expectedActions = [
        {
          type: DUCKS.LOGIN_REQUEST
        }, {
          type: DUCKS.LOGIN_SUCCESS,
          payload: {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRlc3QgVXNlciJ9.J6n4-v0I85' +
            'zk9MkxBHroZ9ZPZEES-IKeul9ozxYnoZ8',
            user: {}
          }
        }
      ];

      nock(SERVER_URL)
      .post('/api/accounts/login/')
      .reply(200, {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRlc3QgVXNlciJ9.J6n4-v0I85' +
        'zk9MkxBHroZ9ZPZEES-IKeul9ozxYnoZ8',
        user: {}
      });

      const middlewares = [thunk];
      const mockStore = configureStore(middlewares);
      const store = mockStore({});

      store.dispatch(DUCKS.login())
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      }).then(done).catch(done);
    });

    it('login should create LOGIN_REQUEST and LOGIN_FAILURE when API returns 401', (done) => {
      const expectedActions = [
        {
          type: DUCKS.LOGIN_REQUEST
        }, {
          type: DUCKS.LOGIN_FAILURE,
          payload: {
            errorCode: 401,
            errorMessage: 'Unauthorized'
          }
        }
      ];

      nock(SERVER_URL)
      .post('/api/accounts/login/')
      .reply(401, { non_field_errors: ['Unauthorized']});

      const middlewares = [thunk];
      const mockStore = configureStore(middlewares);
      const store = mockStore({});

      store.dispatch(DUCKS.login())
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      }).then(done).catch(done);
    });

    it('login should create LOGIN_REQUEST and LOGIN_FAILURE actions when API returns 500', (done) => {
      const expectedActions = [
        {
          type: DUCKS.LOGIN_REQUEST
        }, {
          type: DUCKS.LOGIN_FAILURE,
          payload: {
            errorCode: 500,
            errorMessage: 'A server error occurred while sending your data!'
          }
        }
      ];

      nock(SERVER_URL)
      .post('/api/accounts/login/')
      .reply(500);

      const middlewares = [thunk];
      const mockStore = configureStore(middlewares);
      const store = mockStore({});

      store.dispatch(DUCKS.login())
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      }).then(done).catch(done);
    });

    it('login should create LOGIN_REQUEST and LOGIN_FAILURE actions when API ' +
    'has no response', (done) => {
      const expectedActions = [
        {
          type: DUCKS.LOGIN_REQUEST
        }, {
          type: DUCKS.LOGIN_FAILURE,
          payload: {
            errorCode: 'Connection Error',
            errorMessage: 'An error occurred while sending your data!'
          }
        }
      ];

      nock(SERVER_URL)
      .post('/api/v1/accounts/login/')
      .reply();

      const middlewares = [thunk];
      const mockStore = configureStore(middlewares);
      const store = mockStore({});

      store.dispatch(DUCKS.login())
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      }).then(done).catch(done);
    });
  });

});
