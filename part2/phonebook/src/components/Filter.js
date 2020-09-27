import React from 'react';

const Filter = ({value, handleChange}) => (
  <>
    <span>filter shown with </span><input value={value} onChange={handleChange} />
  </>
)

export default Filter
