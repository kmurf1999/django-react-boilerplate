import fetch from 'isomorphic-fetch'

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const LOGOUT = 'LOGOUT';

const SERVER_URL = 'http://localhost:8000';

const initialState = {
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null,
  user: {},
  token: ''
};

export default createReducer(initialState, {
    [LOGIN_REQUEST]: (state, payload) => {
      return Object.assign({}, state, {
        isAuthenticating: true,
        statusText: ''
      });
    },
    [LOGIN_SUCCESS]: (state, payload) => {
      return Object.assign({}, state, {
        isAuthenticated: true,
        isAuthenticating: false,
        statusText: '',
        token: payload.token,
        user: payload.user,
      });
    },
    [LOGIN_FAILURE]: (state, payload) => {
      return Object.assign({}, state, {
        isAuthenticated: false,
        isAuthenticating: false,
        statusText: `${payload.errorCode} ${payload.errorMessage}`
      });
    },
    [SIGNUP_REQUEST]: (state, payload) => {
      return Object.assign({}, state, {
        isAuthenticating: true,
        statusText: 'Signing up'
      });
    },
    [SIGNUP_SUCCESS]: (state, payload) => {
      return Object.assign({}, state, {
        isAuthenticated: false,
        isAuthenticating: false,
        statusText: ''
      });
    },
    [SIGNUP_FAILURE]: (state, payload) => {
      return Object.assign({}, state, {
        isAuthenticated: false,
        isAuthenticating: false,
        statusText: `${payload.errorCode} ${payload.errorMessage}`
      });
    },
    [LOGOUT]: (state, payload) => {
      return Object.assign({}, state, {
        isAuthenticated: false,
        isAuthenticating: false,
        token: '',
        user: {},
        statusText: ''
      });
    },
});

export function login(username, password) {
  return (dispatch) => {
    dispatch(loginRequest());
    const auth = btoa(`${username}:${password}`);
    return fetch(`${SERVER_URL}/api/accounts/login/`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`
      }
    })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then((response) => {
      dispatch(loginSuccess(response.token, response.user));
    })
    .catch((error) => {
      if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
        // Invalid authentication credentials
        return error.response.json().then((data) => {
          dispatch(loginFailure(401, data.non_field_errors[0]));
        });
      } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
        // Server side error
        dispatch(loginFailure(500, 'A server error occurred while sending your data!'));
      } else {
        // Most likely connection issues
        dispatch(loginFailure('Connection Error', 'An error occurred while sending your data!'));
      }

      return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
    });
  };
}

export function loginRequest() {
  return {
    type: LOGIN_REQUEST
  };
}

export function loginSuccess(token, user) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  return {
    type: LOGIN_SUCCESS,
    payload: {
      token,
      user
    }
  };
}

export function loginFailure(errorCode, errorMessage) {
  localStorage.removeItem('token');
  return {
    type: LOGIN_FAILURE,
    payload: {
      errorCode,
      errorMessage
    }
  };
}

export function signupRequest() {
  return {
    type: SIGNUP_REQUEST
  };
}

export function signupSuccess() {
  return {
    type: SIGNUP_SUCCESS
  };
}

export function signupFailure(errorCode, errorMessage) {
  return {
    type: SIGNUP_FAILURE,
    payload: {
      errorCode,
      errorMessage
    }
  };
}

export function signup(username, password) {
  return (dispatch) => {
    dispatch(signupRequest());
    return fetch(`${SERVER_URL}/api/accounts/register/`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then((response) => {
      dispatch(signupSuccess());
      dispatch(login(username, password));
    })
    .catch((error) => {
      if (error && typeof error.response !== 'undefined' && error.response.status === 400) {
        // Invalid authentication credentials
        return error.response.json().then((data) => {
          // get first key value of respose and send it to function
          dispatch(signupFailure(400, data[Object.keys(data)[0]] ));
        });
      } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
        // Server side error
        dispatch(signupFailure(500, 'A server error occurred while sending your data!'));
      } else {
        // Most likely connection issues
        dispatch(signupFailure('Connection Error', 'An error occurred while sending your data!'));
      }

      return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
    });
  };
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return {
    type: LOGOUT
  };
}

// Helper functions
export function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type];
        return reducer ? reducer(state, action.payload) : state;
    };
}

export function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

export function parseJSON(response) {
    return response.json();
}
