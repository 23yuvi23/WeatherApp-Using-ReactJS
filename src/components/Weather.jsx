import React, { useEffect, useRef, useState } from 'react'
import "./Weather.css"
import search_icon from "../assets/search.png"
import clear_icon from "../assets/clear.png"
import cloud_icon from "../assets/cloud.png"
import drizzle_icon from "../assets/drizzle.png"
import humidity_icon from "../assets/humidity.png"
import rain_icon from "../assets/rain.png"
import snow_icon from "../assets/snow.png"
import wind_icon from "../assets/wind.png"


const Weather = () => {
    //search functionality
    const inputRef = useRef()

    //state variable to store data coming from API
    const [weatherData, setWeatherData] = useState(false)

const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon, // Broken clouds ko drizzle ya cloud pe map karein
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,    // Ye missing tha (Rain)
    "10n": rain_icon,
    "11d": rain_icon,    // Thunderstorm
    "11n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
}
    // api adding 
    const search = async (city) => {
        if (city === "") {
        alert("Enter City Name");
        return;
        }
        try{
            const url = 
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
            alert(data.message);
            return;
        }

            // console.log(url);
            // console.log(data);
            const iconCode = data.weather[0].icon;
            const icon = allIcons[iconCode] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed :data.wind.speed,
                temperature:Math.floor(data.main.temp),
                location:data.name,
                icon: icon
            })
        } catch (error) {
            setWeatherData(false);
            console.error("Error in fetching data");
        }
    }

    //call search () whenever component gets loaded 
    useEffect(()=>{
        search("North Pole");
    },[])


  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" name="" id="" placeholder='search'/>
            <img onClick={()=>search(inputRef.current.value)} src={search_icon} alt="search"/>
        </div>
        <img src={weatherData.icon} alt="clear" className='weather-icon'/>
        <p className='temperature'>{weatherData.temperature}°C</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">

            <div className="col">
                <img src={humidity_icon} alt="humidity" />
                <div>
                    <p>{weatherData.humidity} %</p>
                    <span>Humidity</span>
                </div>
            </div>

            <div className="col">
                <img src={wind_icon} alt="humidity" />
                <div>
                    <p>{weatherData.windSpeed} km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Weather