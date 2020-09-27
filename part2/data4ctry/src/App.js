import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Country from './components/Country';

function App() {
  const [countries, setCountries] = useState([])
  const [filterText, setFilterText] = useState('')

  const onFilterChange = event => setFilterText(event.target.value)

  const handleButtonOf= (country) => {
    setFilterText(country.name) 
  }

  const countriesToShow = filterText === '' ? countries : countries.filter( country => (
    country.name.toLowerCase().includes(filterText.toLowerCase())
  ))

  useEffect( () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then( res => {
        setCountries(res.data)
      })
  }, [])

  return (
    <>
      <div>
        find countries <input value={filterText} onChange={onFilterChange} />
      </div>
      {countriesToShow.length > 10 &&
        "Too many matches, specify another filter"
      }
      {countriesToShow.length <= 10 && countriesToShow.length > 1 &&
        countriesToShow.map( country => 
          <p key={country.alpha3Code}>{country.name} 
           <button onClick={() => handleButtonOf(country)}>show</button>
          </p>
        )
      }
      {countriesToShow.length === 1 &&
          <Country
            {...countriesToShow[0]} />
      }
    </>
  );
}

export default App;
