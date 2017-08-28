import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';


import '../../../styles/auth.scss';

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  return errors
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <TextField
    {...input}
    floatingLabelText={label}
    errorText={touched && error ? error : null}
    type={type}
  />
);

const renderAsyncError = statusText => {
  if (statusText) {
    return (
      <div className="asyncError">{statusText}</div>
    );
  }
};

const Login = props => {
  const { handleSubmit, pristine, submitting, username, password, statusText } = props;
  return (
    <MuiThemeProvider>
      <div>
        <Paper className="formContainer">
          <h4 className="form-banner">Login</h4>
          <form className="form" onSubmit={e => handleSubmit(e, username, password)}>
            {renderAsyncError(statusText)}
            <Field name="username" type="text" component={renderField} label="Username"/>
            <Field name="password" type="password" component={renderField} label="Password"/>
            <RaisedButton className="formButton" type="submit" primary={true} label={submitting ? "Submitting" : "Submit"} disabled={pristine || submitting} />
          </form>
        </Paper>
        <p className="help-text">Don't have an account? <Link to='/signup'>Signup</Link></p>
      </div>
    </MuiThemeProvider>
  );
}

// Decorate the form component
export default reduxForm({
  form: 'login', // a unique name for this form
  validate
})(Login);
