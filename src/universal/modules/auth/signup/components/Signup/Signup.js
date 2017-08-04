import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';

import styles from '../../../styles/auth.css';


const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password !== values.passwordAgain) {
    errors.password = 'Passwords do not match';
  }
  if (!values.passwordAgain) {
    errors.passwordAgain = 'Required';
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
      <div className={styles.asyncError}>{statusText}</div>
    );
  }
};

const Signup = props => {
  const { handleSubmit, pristine, submitting, username, password, statusText } = props;
  return (
    <MuiThemeProvider>
      <Paper className={styles.formContainer}>
        <form className={styles.form} onSubmit={e => handleSubmit(e, username, password)}>
          {renderAsyncError(statusText)}
          <Field name="username" type="text" component={renderField} label="Username"/>
          <Field name="password" type="password" component={renderField} label="Password"/>
          <Field name="passwordAgain" type="password" component={renderField} label="Password (Again)"/>
          <RaisedButton className={styles.formButton} type="submit" primary={true} label="Submit" disabled={pristine || submitting} />
        </form>
      </Paper>
    </MuiThemeProvider>
  );
}

// Decorate the form component
export default reduxForm({
  form: 'signup', // a unique name for this form
  validate
})(Signup);
