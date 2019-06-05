import React, { useState, Fragment } from 'react';
import { Controls } from './Controls';

import { UserForm } from '../UserForm';

export function Wizard(props) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: '', password: '', email: '' });
  console.log('form', form);

  const nextStep = () => {
    if (step !== 5) setStep(step + 1);
  };

  const prevStep = () => {
    if (step !== 0) setStep(step - 1);
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      {(() => {
        switch (step) {
          case 0:
            return <Fragment>Welcome Page!</Fragment>;
          case 1:
            return <UserForm values={form} onInputChange={handleChange} />;
          case 2:
            return <Fragment>Step 2</Fragment>;
          case 3:
            return <Fragment>Step 3</Fragment>;
          case 4:
            return <Fragment>Step 4</Fragment>;
          case 5:
            return <Fragment>End Page!</Fragment>;
        }
      })()}
      <hr />
      <Controls btnClassNames='btn btn-primary' prevStep={prevStep} nextStep={nextStep} />
    </Fragment>
  );
}
