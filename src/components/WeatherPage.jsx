import React, { useEffect, useRef, useState } from 'react'
import './WeatherPage.css'
import search_icon from '../assets/search.png'
import weather_img from '../assets/clear.png'
import clear_img from '../assets/clear.png'
import cloud_img from '../assets/cloud.png'
import drizzle_img from '../assets/drizzle.png'
import humidity_img from '../assets/humidity.png'
import rain_img from '../assets/rain.png'
import snow_img from '../assets/snow.png'
import wind_image from '../assets/wind.png'

const WeatherPage = () => {

  const inputRef = useRef()

  const [weatherData , setWeatherData] = useState(false)
  
  const allIcons = {
    "01d" : clear_img,
    "01n" : clear_img,
    "02d" : cloud_img,
    "02n" : cloud_img,
    "03d" : cloud_img,
    "03n" : cloud_img,
    "04d" : drizzle_img,
    "04n" : drizzle_img,
    "09d" : rain_img,
    "09n" : rain_img,
    "10d" : rain_img,
    "10n" : rain_img,
    "13d" : snow_img,
    "13n" : snow_img
  }

  const search = async (city) => {
    if(city === ""){
      alert("Enter city name..")
      return
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json()

      if(!response.ok){
        alert(data.message)
        return
      }

      console.log(data); 
      const icon = allIcons[data.weather[0].icon] || clear_img
      setWeatherData({
        humidity : data.main.humidity,
        winderSpeed : data.wind.speed,
        temperature : Math.floor(data.main.temp),
        location : data.name,
        icon : icon
      })
    } catch (error) {
      setWeatherData(false)
      console.log(error);
    }
  }

  useEffect(() => {
    search("New York")
  },[]) 

  return (
    <div className='Weather'>
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Plaese search' required/>
        <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)} />
      </div>
      {weatherData?<>
        <img src={weather_img} alt="" className='weather-icon'/>
      <p className='temperature'>{weatherData.temperature}°c</p>
      <p className='location'>{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_img} alt="" />
          <div>
            <p>{weatherData.humidity} %</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_image} alt="" />
          <div>
            <p>{weatherData.winderSpeed} km/h</p>
            <span>Wind speed</span>
          </div>
        </div>
      </div>
      </>:<></>}
      
    </div>
  )
}

export default WeatherPage
