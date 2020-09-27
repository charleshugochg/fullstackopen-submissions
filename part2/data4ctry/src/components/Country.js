import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Country = (props) => {
  const [weather, setWeather] = useState(null)

  useEffect( () => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${props.name}`)
      .then( res => {
        if (res.data.success !== false)
          setWeather(res.data)
      })
  }, [])

  return (
    <>
      <h1>{props.name}</h1>
      <div>
        capital {props.capital}
      </div>
      <div>
        population {props.population}
      </div>
      <h3>Spoken languages</h3>
      <ul>
        {props.languages.map( lang => <li key={lang.name}>{lang.name}</li> )}
      </ul>
      <img src={props.flag} width='100' height='100' alt='flag' />
      <h3>Weather in {props.capital}</h3>
      {weather ? (
        <>
          <div>
            temperature: {weather.current.temperature}
          </div>
          <img alt="weather icon" width='50' height='50' src={weather.current.weather_icons[0]} />
          <div>
            wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </>
  )
}

export default Country
