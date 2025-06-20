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
import styles from './WeatherWindow.module.css'

function getWeatherIcon(weatherCode: number) {
    if ([0].includes(weatherCode)) return faSun;
    if ([1].includes(weatherCode)) return faCloudSun;
    if ([2, 3].includes(weatherCode)) return faCloud;
    if ([45, 48].includes(weatherCode)) return faSmog;
    if ([51, 53, 55, 56, 57].includes(weatherCode)) return faCloudRain;
    if ([61, 63, 65, 66, 67].includes(weatherCode)) return faCloudShowersHeavy;
    if ([71, 73, 75, 85, 86].includes(weatherCode)) return faSnowflake;
    if ([80, 81, 82].includes(weatherCode)) return faCloudSunRain;
    if ([95, 96, 99].includes(weatherCode)) return faBolt;
    return faSun;
}

export default function WeatherWindow({data}: {data: WeeklyWeather}) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.icon}>
                <FontAwesomeIcon icon={getWeatherIcon(data.weatherCode)} size="3x" />
            </div>
            <div className={styles.info}>
                <p>{data.date}</p>
                <p>Min temp. {data.minTemperature} °C</p>
                <p>Max temp. {data.maxTemperature} °C</p>
                <p>
                    <span className={styles.energyTooltip} title="Szacowana energia wyprodukowana przez panele słoneczne">
                        Energia {data.estimatedGeneratedEnergy} kWh
                    </span>
                </p>
            </div>
        </div>
    );
}