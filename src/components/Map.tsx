'use client'

import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L, {LatLng, LatLngExpression} from 'leaflet';
import {useEffect, useState} from "react";

interface MapProps {
    mapClickAction?: (LatLng: LatLng) => void;
    mapCenter?: LatLngExpression;
}

delete (L.Icon.Default as any).prototype._getIconUrl;


L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});
function PlaceableMarker( { mapClickAction, mapCenter }: MapProps) {
    const [position, setPosition] = useState(null);

    const map = useMapEvents({
        locationfound(e) {
            setPosition(e?.latlng);
            map.setView(e?.latlng, map.getZoom(), {animate:false});
            mapClickAction?.(e.latlng);
        },
        click(e) {
            setPosition(e?.latlng);
            mapClickAction?.(e.latlng);
        }
    })

    useEffect(() => {
        map.locate();
    }, [map]);

    useEffect(() => {
        if (mapCenter) {
            setPosition(mapCenter);
            map.setView(mapCenter, map.getZoom(), {animate:false});
        }
    }, [mapCenter]);

    return position === null ? null :(
        <Marker position={position}></Marker>
    )
}

export default function Map({mapCenter, mapClickAction} : MapProps) {
    const [position, setPosition] = useState<LatLngExpression>([51.505, -0.09]);
    useEffect(() => {
        if (mapCenter) {
            setPosition(mapCenter);
        }
    }, [mapCenter]);

    return (
        <div style={{ height: '400px', width: '100%' }}>
            <MapContainer
                center={position}
                zoom={13}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <PlaceableMarker mapClickAction={mapClickAction} mapCenter={mapCenter} />
            </MapContainer>
        </div>
    );
}