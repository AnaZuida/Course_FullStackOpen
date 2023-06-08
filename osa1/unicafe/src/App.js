import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => {
  return (
    <tr><td>{text}:</td><td>{value}</td></tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <p>No feedback given. Please, use buttons above to give a feedback.</p>
      </div>
    )
  } else {
    let FbAll = good + neutral + bad
    let FbAvg = (1*good + 0*neutral + -1*bad) / FbAll
    let FbPos = good / (good+neutral+bad) * 100
  
    return ( 
      <div>
        <table><tbody>
        <StatisticLine text="Good" value={good} /> 
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="All" value={FbAll} />
        <StatisticLine text="Average" value={FbAvg.toLocaleString(undefined, {maximumFractionDigits: 2})} />
        <StatisticLine text="Positive" value={FbPos.toLocaleString(undefined, {maximumFractionDigits: 2}) +" %"} />
        </tbody></table>
      </div>
    )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const feedbackGood = () => setGood(good + 1)
  const feedbackNeutral = () => setNeutral(neutral + 1)
  const feedbackBad = () => setBad(bad + 1)

  return (
    <div>
      <p><b>Give us feedback:</b></p>
      <Button handleClick={feedbackGood} text='good' />
      <Button handleClick={feedbackNeutral} text='neutral' />
      <Button handleClick={feedbackBad} text='bad' />
      <p><b>Feedback statistics:</b></p>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App