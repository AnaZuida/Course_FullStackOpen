import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import weatherService from './services/weather'

const Notification =  ({ message }) => {
  if(message === null) {
    return null
  }

  return (
    <div className="notification">
      {message}
    </div>
  )  
}

const SearchForm = ({newFilter, handleFilterChange}) => {
  return (
    <form>
      <div>
        Find countries <input value={newFilter} onChange={handleFilterChange} />  
      </div>
    </form>
  )
}

const ListCountries = ({countriesToShow, errorMessage}) => {
  //const countriesToShow = newFilter ? countryNames.filter(countryName => countryName.includes(newFilter)) : countryNames
  //console.log(newFilter)
  //console.log(countryNames)
  console.log(countriesToShow)

  if(countriesToShow === null) {
    return null
  } else if (countriesToShow.length > 10) {
    return errorMessage.setErrorMessage(`Too many matches. Please specify another filter.`)
  } else if (countriesToShow.length == 1) {
    return <CountryInfo countryToShow={countriesToShow[0]} />
  } 
    return (
      <div>
        <ul>
          {countriesToShow.map(country => (
            <li key={country}>{country}<button onClick={() => CountryInfo(country)}>show</button></li>
          ))}
        </ul>
      </div>
    )
  
}

const CountryInfo = ({countryToShow}) => {
  let countryCapital = null
  countriesService
    .getCountry(countryToShow)
      .then(country => {
        countryCapital = country.capital
      })
      .catch(error => {
          setErrorMessage(`Country was not found from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
      })
  
        return (
          <div>
            <div><h2>{country.name.common}</h2></div>
            <div>
              Capital: {country.capital}<br />
              Area: {country.area}
            </div>
            <div>
              <b>Languages:</b><br />
              <ul>
              {country.languages.map(language => (
                <li>{language}</li>
              ))}
              </ul>
            </div>
            <div>
              <img src={country.flags.png} alt={country.flags.alt} />
            </div>
          </div>
        )
      }
      

      
  weatherService
    .getWeather(countryCapital)
      .then(weather => {
        return (
            <div>
              <b>Weather in {countryCapital}</b>
              Temperature: {weather.temp_c} Celcius
              <img src='http:{weather.condition.icon}'>{weather.condition.text}</img>
              Wind: {weather.wind_kph} Km/h
            </div>
        )
      })
  /*
  return (
    <div>
      
    </div>
  )
  */


const App = () => {
  const [countries, setCountries] = useState([])
  //const [countryNames, setCountryNames] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  let countryNames = []
  let countriesToShow = null
  //let countriesToShow = newFilter ? countryNames.filter(countryName => countryName.includes(newFilter)) : countryNames

  useEffect(() => {
    countriesService
      .getAll()
        .then(initialCountries => {
          setCountries(initialCountries)
          //setCountryNames(initialCountries.name)
           //countryNames = countries.map(({name}) => name.common)
           //setCountryNames(countries.map(({name}) => name.common))
           countryNames = countries.map(({name}) => name.common)
           // console.log(countryNames)
        })   
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    countriesToShow = newFilter ? countryNames.filter(countryName => countryName.includes(newFilter)) : countryNames
    //console.log(countriesToShow)
  }

  return (
    <div>
      <h2>Country Info Service</h2>
      <SearchForm newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <ListCountries countriesToShow={countriesToShow} errorMessage={errorMessage} />
      <Notification message={errorMessage} />
    </div>
  )

}

export default App;
