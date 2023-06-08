const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
    return (
      <>
        {props.parts.map((element, index) => {
          return (
            <div key={index}>
              <Part course={element.name} exercises={element.exercises} />
            </div>
          )
        })}
      </>
    )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.course} {props.exercises}</p>
    </div>
  )
}

const Total = (props) => {
  let amount = 0
  props.parts.forEach(element => {
    amount = amount + element.exercises 
  });
  return (
    <div>
      <p>Number of exercises {amount} </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
        {
        name: 'Fundamentals of React',
        exercises: 10
        },
        {
        name: 'Using props to pass data',
        exercises: 7
        },
        {
        name: 'State of a component',
        exercises: 14
        }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
