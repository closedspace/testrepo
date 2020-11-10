import React from 'react'
import './WeatherCard.css';
const Icon = ({code}) => <img src={`https://www.weatherbit.io/static/img/icons/${code}.png`} />

const WeatherCard = ({day}) => {
    console.log(day);
    const sunrise = new Date(day.sunrise_ts * 1000);
    const sunset = new Date(day.sunset_ts * 1000);
    const sunriseTime = sunrise.getHours() + ':' + sunrise.getMinutes();
    const sunsetTime = sunset.getHours() + ':' + sunset.getMinutes() ;
    return (
        <div className="WeatherCard">
            <div className="DateTime">
                Date: {day.datetime}
            </div>
            <div className="CardRow">
                <div className="CardCol">
                    <div>
                        Day: {day.max_temp}
                    </div>
                    <div>
                        {day.weather.description}
                    </div>
                    <Icon code={day.weather.icon} />
                </div>
                <div className="CardCol">
                    <div>
                        Night: {day.min_temp}
                    </div>
                </div>
            </div>
            <div> Sunrise: { sunriseTime }</div>
            <div> Sunset: { sunsetTime }</div>
        </div>
    )
}

export default WeatherCard