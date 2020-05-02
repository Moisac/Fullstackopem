import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Weather = ({ search, capital }) => {
    const [weather, setWeather] = useState('')
    const api_key = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com//current?access_key=${api_key}&query=${capital}`)
            .then((response) =>{
                setWeather(response.data)
            })
    }, [])
    return (
        <div>
            <img src={weather && weather.current.weather_icons[0]} /><span>{weather && weather.current.weather_descriptions[0]}</span>
            <p>Temperature: {weather && weather.current.temperature}<sup>0</sup>C</p>
            <p>Observation time: {weather && weather.current.observation_time}</p>
            <p>Wind speed: {weather && weather.current.wind_speed}</p>
            {console.log(weather)}
        </div>
    )
}
