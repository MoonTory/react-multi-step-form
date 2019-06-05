import React, { Fragment } from 'react';

export function UserForm({ onInputChange, values }) {
  return (
    <Fragment>
      <label htmlFor='name'>Email: </label>
      <input onChange={onInputChange} name='email' placeholder={values.email} type='email' />
      <br />
      <label htmlFor='name'>Name: </label>
      <input onChange={onInputChange} name='name' placeholder={values.name} type='text' />
      <br />
      <label htmlFor='name'>Password: </label>
      <input onChange={onInputChange} name='password' type='password' />
    </Fragment>
  );
}
