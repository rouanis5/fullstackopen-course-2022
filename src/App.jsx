import {useEffect, useState} from 'react'
import UseFetch from './fetchHook';

const API_URL = 'https://restcountries.com/v3.1/all';

function App() {
  const {data: countriesData, loading: countriesLoading, error: countriesError} = UseFetch(API_URL)

  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])
  
  useEffect(()=>{
    if (countriesData) {
      const res = countriesData.filter(el=> el.name.common.toLowerCase().match(country.toLowerCase()))
      res.map(el => el.displayed = false)
      setCountries(res)
    }
  },[country])

  return (
    <div>
      {countriesLoading && <h3>Loading ...</h3>}
      {countriesError && <h3>{countriesError}</h3>}
      {!countriesLoading && !countriesError &&
        <form>
          <label htmlFor="countries">find countries</label>
          <input type="text" id="countries" value={country} onChange={(e)=>{setCountry(e.target.value)}}/>
        </form>
      }
      {countries && countries.length < 10 ?
        <>
          {countries.map(({name: {common: name}, capital, area, languages, flags : {svg : flag}, displayed})=> 
            <div key={name}>
                  
              {!displayed ? 
                <>
                  <span>{name}</span>
                  <button onClick={()=>{
                    setCountries(prev => {
                      return prev.map(el =>{
                        return {
                          ...el, displayed: el.name.common === name
                        }
                      })
                    })}
                  }>
                    show
                  </button>
                </>
              :
                <>
                  <h2>{name}</h2>
                  <p>captial {capital}</p>
                  <p>area {area}</p>
                  <h4>languages:</h4>
                  <ul>
                    {Object.values(languages).map((lan) => <li key={lan}>{lan}</li>)}
                  </ul>
                  <img src={flag} alt={`the flag of ${name}`} width={100} />
                </>
              }
            </div>
          )}
        </>
      :
        <p>Too many matches, specify another filter</p>
      }
    </div>

  )
}

export default App
