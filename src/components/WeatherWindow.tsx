import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faSun,
    faCloud,
    faBolt,
    faCloudSun,
    faCloudRain,
    faSmog,
    faCloudShowersHeavy,
    faSnowflake, faCloudSunRain
} from '@fortawesome/free-solid-svg-icons';
import {WeeklyWeather} from "../app/page";

function getWeatherIcon(weatherCode: number) {
    switch (weatherCode) {
        case 0:
            return faSun;
        case 1:
            return faCloudSun;
        case 2:
        case 3:
            return faCloud;
        case 45:
        case 48:
            return faSmog;
        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
            return faCloudRain;
        case 61:
        case 63:
        case 65:
        case 66:
        case 67:
            return faCloudShowersHeavy;
        case 71:
        case 73:
        case 75:
            return faSnowflake;
        case 80:
        case 81:
        case 82:
            return faCloudSunRain;
        case 85:
        case 86:
            return faSnowflake;
        case 95:
        case 96:
        case 99:
            return faBolt;
        default:
            return faSun;
    }
}

export default function WeatherWindow({data}: {data: WeeklyWeather}) {
    return (
        <div id="window">
            <p>{data.Date}</p>
            <FontAwesomeIcon icon={getWeatherIcon(data.WeatherCode)} size="3x" />
            <p>Min temp. {data.MinTemperature} °C</p>
            <p>Max temp. {data.MaxTemperature} °C</p>
            <p>Energia {data.EstimatedGeneratedEnergy} kWh</p>
        </div>
    )
}