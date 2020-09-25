import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({text, handleClick}) => (
  <button onClick={handleClick}>{text}</button>
)

const Statistic = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, natural, bad, all}) => ( 
  <>
    <h1>Statistics</h1>
    {all !== 0 ? 
    (
      <table>
        <Statistic text={'good'} value={good} />
        <Statistic text={'natural'} value={natural} />
        <Statistic text={'bad'} value={bad} />
        <Statistic text={'all'} value={all} />
        <Statistic text={'average'} value={Math.abs(good-bad)/all} />
        <Statistic text={'possitive'} value={(good/all)*100} />
      </table>
    ) : (
      <p>No feedback given</p>
    )}
  </>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [natural, setNatural] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + natural + bad

  return (
    <>
      <h1>Give Feedback</h1>
      <Button text={'good'} handleClick={()=>setGood(good+1)}/>
      <Button text={'natural'} handleClick={()=>setNatural(natural+1)}/>
      <Button text={'bad'} handleClick={()=>setBad(bad+1)}/>
      <Statistics good={good} natural={natural} bad={bad} all={all} />
    </>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

