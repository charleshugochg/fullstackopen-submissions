import React from 'react';
import { CoursePart } from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}

interface PartProps {
  part: CoursePart;
}

const Part: React.FC<PartProps> = ({ part }) => {
  switch (part.name) {
    case "Fundamentals":
      return (
        <p>
          {part.name} {part.exerciseCount} {part.description}
        </p>
      );
    case "Using props to pass data":
      return (
        <p>
          {part.name} {part.exerciseCount} {part.groupProjectCount}
        </p>
      );
    case "Deeper type usage":
      return (
        <p>
          {part.name} {part.exerciseCount} {part.description} {part.exerciseSubmissionLink}
        </p>
      );
    case "Custom":
      return (
        <p>
          {part.name} {part.exerciseCount} {part.description}
        </p>
      );
    default:
      return assertNever(part);
  }
}

export default Part;
