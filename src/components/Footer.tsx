import React from "react";
import {SummaryWeather} from "../app/page";
import styles from './Footer.module.css'

export default function Footer({data}: {data: SummaryWeather}) {
    return (
        <div className={styles.div}>
            <p>Najwyższa temperatura: {data.maxTempWeek} °C</p>
            <p>Najniższa temperatura: {data.minTempWeek} °C</p>
            <p>Średnie ciśnienie: {data.averagePressure} hPa</p>
            <p>Średni czas ekspozyzji na słońce: {data.averageSunExposure} h</p>
            <p>{data.description}</p>
        </div>
    )
}