import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  if (values.password !== values.passwordAgain) {
    errors.password = 'Passwords do not match';
  }
  return errors
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const renderAsyncError = statusText => {
  if (statusText) {
    return (
      <h1>{statusText}</h1>
    );
  }
};

const Signup = props => {
  const { handleSubmit, pristine, submitting, username, password, statusText } = props;
  return (
    <form onSubmit={e => handleSubmit(e, username, password)}>
      {renderAsyncError(statusText)}
      <Field name="username" type="text" component={renderField} label="Username"/>
      <Field name="password" type="password" component={renderField} label="Password"/>
      <Field name="passwordAgain" type="password" component={renderField} label="Password (Again)"/>
      <button type="submit" disabled={pristine || submitting} >Submit</button>
    </form>
  );
}

// Decorate the form component
export default reduxForm({
  form: 'signup', // a unique name for this form
  validate
})(Signup);
