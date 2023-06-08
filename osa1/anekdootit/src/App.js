import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const randomIntInRange = (min, max) => {
  return Math.floor(Math.random()*(max - min + 1)) + min
}

const HighestVotes = ({anecdotes, anecdoteVotes}) => {
  let highestvotesamount = 0
  let highestvotesanecdote = ""
  let highestvoteindex = 0
  anecdoteVotes.forEach((anecdoteVote, index) => {
    if (anecdoteVote > highestvotesamount) {
      highestvotesamount = anecdoteVote
      highestvoteindex = index
    }
  });
  highestvotesanecdote = anecdotes[highestvoteindex]
  return <div><div>{highestvotesanecdote}</div><br /><div>With {highestvotesamount} votes.</div></div>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [anecdoteVotes, setAnecdoteVotes] = useState(Array(anecdotes.length).fill(0))
  // [Array(anecdotes.length).fill(0)]
  // console.log(anecdoteVotes)
  const nextAnecdote = () => {
    setSelected(randomIntInRange(0, anecdotes.length-1)) 
  }

  const voteAnecdote = () => {
    const anecdoteVotesCopy = [...anecdoteVotes]
    anecdoteVotesCopy[selected] += 1
    setAnecdoteVotes(anecdoteVotesCopy)
    //console.log(anecdoteVotesCopy)
  }
  
  return (
    <div>
      <div>
        <p><b>Anecdote of the day</b></p>
        {anecdotes[selected]}<br /><br />
        This anecdote has {anecdoteVotes[selected]} votes.<br />
        <Button handleClick={voteAnecdote} text="vote" />
        <Button handleClick={nextAnecdote} text='next anecdote' />
      </div>
      <div>
        <p><b>Anecdote with most votes</b></p>
        <HighestVotes anecdotes={anecdotes} anecdoteVotes={anecdoteVotes} />
      </div>
    </div>
  )
}

export default App
