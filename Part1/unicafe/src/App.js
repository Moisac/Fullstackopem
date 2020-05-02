import React, { useState } from 'react'
import {Button} from './components/Button';
import {Statistics} from './components/Statistics';

export const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState([])

  const totalVotes = good + neutral + bad;
  const positiveVotes = (good * 100) / totalVotes;

  const average = all.reduce((a, b) => {
      return a + b / all.length;
  }, 0);

  const increaseGood = () => {
    setAll(all.concat(1))
    setGood(good + 1);
  }
  const increaseNeutral = () => {
    setAll(all.concat(0))
    setNeutral(neutral + 1);
  }
  const increaseBad = () => {
    setAll(all.concat(-1))
    setBad(bad + 1);
  }

  return (
    <>
      <h2>Give feedback</h2>
      <Button handleClick={increaseGood} text="Good"/>
      <Button handleClick={increaseNeutral} text="Neutral"/>
      <Button handleClick={increaseBad} text="Bad"/>
      <h2>Statistics</h2>
      <Statistics value={good} text="Good" />
      <Statistics value={neutral} text="Neutral" />
      <Statistics value={bad} text="Bad" />
      <Statistics value={totalVotes} text="All votes" />
      <Statistics value={average} text="Average votes" />
      <Statistics value={positiveVotes ? positiveVotes +'%': 'Vote to see the percentage'} text="Positive votes" />
    </>
  )
}

