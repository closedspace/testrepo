import { Button } from 'antd';
import React from 'react';
import WeatherCard from './WeatherCard';
import './Forecast.css';
const Forecast = ({setShowAltInput, setShowForecast, data: { city_name }, data: { data }}) => {
    return (
        <div>
            <Button type="primary" onClick={() => {setShowForecast(false); setShowAltInput(false)}}> Back </Button>
            <h1> Showing forecast for {city_name}</h1>
            <div className="Forecast">
                {data.map((day, indx) => indx > 2 ? '' : <WeatherCard key={indx} day={day} />)}
            </div>
        </div>
    )
}


export default Forecast;