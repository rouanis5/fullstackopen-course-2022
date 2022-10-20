import UseFetch from './fetchHook'
import { APIs } from './App'

const WeatherSection = ({cityname, lat, lon}) => {
  const {data, loading, error} = UseFetch(APIs.weather.url +'/?'+ new URLSearchParams({
    lat,
    lon,
    appid: APIs.weather.key
  }).toString())
  
  return (
    <div>
      {loading && <p>loading weather...</p>}
      {error && <p>{error}</p>}
      <p>
      </p>
      {!loading && !error && 
        <div>
          <h3>weather in {cityname}</h3>
          {/* temperture is in Kelvin */}
          <p>temperture { (data.main.temp - 273.15).toFixed(2)} Celius</p>
          <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt={data.weather.data}/>
          <p>wind {data.wind.speed} m/s</p>
        </div>
      }
    </div>
  )
}

export default WeatherSection
