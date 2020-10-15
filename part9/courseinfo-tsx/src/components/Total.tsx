import React from 'react';

interface TotalProps {
  total: number;
}

const Total: React.FC<TotalProps> = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.total}
    </p>
  )
}

export default Total;
