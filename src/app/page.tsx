'use client';

import {useState} from 'react';

import WeatherWindow from "../components/WeatherWindow";
import Footer from "../components/Footer";
import dynamic from "next/dynamic";
import {geocodeByPlaceId, getLatLng} from "react-google-places-autocomplete";


import 'leaflet/dist/leaflet.css';
import {LatLngExpression} from "leaflet";

const GooglePlacesAutocomplete = dynamic(
    () => import('react-google-places-autocomplete'),
    {ssr: false}
)

const Map = dynamic (
    () => import('../components/Map'),
    {ssr: false}
)

export interface WeeklyWeather {
    date: string;
    weatherCode: number;
    minTemperature: number;
    maxTemperature: number;
    estimatedGeneratedEnergy: number;
}

export interface SummaryWeather {
    averagePressure: number;
    averageSunExposure: number;
    minTempWeek: number;
    maxTempWeek: number;
    description: string;
}

export async function getWeeklyWeather(lat: number, lng:number): Promise<WeeklyWeather[]> {
    const params = new URLSearchParams({
        latitude: lat.toString(),
        longitude: lng.toString(),
    });
    const res = await fetch(`http://localhost:8080/weather?${params.toString()}`,  {
        method: "GET",
    })
    if (!res.ok) {
        throw new Error(res.statusText);
    }
    return res.json();
}

export async function getWeatherSummary(lat: number, lng: number): Promise<SummaryWeather> {
    const params = new URLSearchParams({
        latitude: lat.toString(),
        longitude: lng.toString(),
    })

    const res = await fetch(`http://localhost:8080/weather/summary?${params.toString()}`, {
        method: "GET",
    })
    if (!res.ok) {
        throw new Error(res.statusText);
    }
    return res.json();
}


export default function Home() {
   const [weathers, setWeathers] = useState<WeeklyWeather[]>([]);
   const [summary, setSummary] = useState<SummaryWeather>();
   const [position, setPosition] = useState<LatLngExpression>(null);
    return (<main>
        <div id="search">
            <GooglePlacesAutocomplete
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
                selectProps={{
                    placeholder: 'Miejscowość',
                    onChange: (value) => {
                        const name = value?.value?.place_id;
                        geocodeByPlaceId(name)
                            .then(results => getLatLng(results[0]))
                            .then(({ lat, lng }) => {
                                getWeeklyWeather(lat, lng).then(data => setWeathers(data));
                                getWeatherSummary(lat, lng).then(data => setSummary(data));
                                setPosition([lat, lng]);
                            });
                    },
                    styles: {
                        menu: (provided) => ({
                            ...provided,
                            zIndex: 9999,
                            color: 'black',
                        }),
                    },
                }}
            />
        </div>
        <div id="map">
        <Map mapCenter={position} mapClickAction={(latLng) => {
            getWeeklyWeather(latLng.lat, latLng.lng).then(data => setWeathers(data));
            getWeatherSummary(latLng.lat, latLng.lng).then(data => setSummary(data));
        }} />
        </div>
        <div id="weather">
            {weathers.length === 7 && weathers.map((w, i) => (
                <WeatherWindow key={i} data={w} />
            ))}
        </div>
        <div id="footer">
        {summary && (<Footer data={summary} />)}
        </div>
    </main>)
}