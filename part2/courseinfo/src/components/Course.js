import React from 'react';

const Header = (props) => (
  <h2>{props.course}</h2>
)

const Part = (props) => (
  <p>
    {props.name} {props.exercises}
  </p>
)

const Content = (props) => (
  <>
    {props.parts.map(part=>(
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    ))}
  </>
)

const Total = (props) => {
  const total = props.parts.reduce((acc, part)=>acc+part.exercises, 0) 
  return (
    <h4>total of {total} exercises</h4>
  )
}

const Course = ({course}) => (
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
)

export default Course
