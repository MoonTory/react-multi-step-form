import React, { Fragment } from 'react';

export function Controls({ prevStep, nextStep, btnClassNames, btnStyles }) {
  return (
    <Fragment>
      <button style={btnStyles} className={btnClassNames} onClick={prevStep}>
        Prev
      </button>{' '}
      <button style={btnStyles} className={btnClassNames} onClick={nextStep}>
        Next
      </button>
    </Fragment>
  );
}
