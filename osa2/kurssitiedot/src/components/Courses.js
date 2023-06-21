const Course = ({ courses }) => {
    /*return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    ) {course.parts.exercises} */
    // {course.parts.map(parts => ( ))}
    return (
      <div>
          {courses.map(course => (
            <div key={course.id}>
              <div key={course.id}><Header course={course.name} /></div>
              <Content parts={course.parts} /> 
              <Total parts={course.parts} />
            </div>
          ))}
      </div>
    )
  }
  
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
    /*let amount = 0
    props.parts.forEach(element => {
      amount = amount + element.exercises 
    }); */
  
    const initialVal = 0
    const amount = props.parts.reduce((sum, number) => 
      sum + number.exercises, initialVal
    )
  
    return (
      <div>
        <p><b>Number of exercises {amount} </b></p>
      </div>
    )
  }

  export default Course