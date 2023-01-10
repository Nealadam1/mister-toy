import React, { useRef, useState } from 'react';
import GoogleMapReact from 'google-map-react';
const branches = [
    {
        name: "Toys NY",
        pos: { lat: 40.7254478, lng: -73.9712327 }
    },
    {
        name: "Toys Israel",
        pos: { lat: 32.0879267, lng: 34.7621408 }
    },
    {
        name: "Toys Paris",
        pos: { lat: 48.8501158, lng: 2.2901378 }
    },
]

export function BranchMap() {

    const [currentLocation, setCurrentLocation] = useState(branches[0].pos)
    const mapRef = useRef(null)

    const onMarkerClick = (branch) => {
        setCurrentLocation(branch.pos)
        if (mapRef.current) {
            mapRef.current.panTo({ lat: branch.pos.lat, lng: branch.pos.lng });
        }
    }

    return (
        <div style={{ height: '60vh', width: '100%' }}>
            <GoogleMapReact
                ref={mapRef}
                bootstrapURLKeys={{ key: 'AIzaSyCdMrI-Xk1voWmG0ElGvVt5wrVN0mMsL-c' }}
                defaultCenter={currentLocation}
                center={currentLocation}
                defaultZoom={8}
            >
                {branches.map((branch, index) => (
                    <Marker
                        key={index}
                        lat={branch.pos.lat}
                        lng={branch.pos.lng}
                        text={branch.name}
                        onClick={() => onMarkerClick(branch)}
                    />
                ))}
            </GoogleMapReact>
        </div>
    );
}

const Marker = ({ text, onClick }) => (
    <div
        onClick={onClick}
        style={{
            color: 'white',
            background: 'blue',
            padding: '15px 10px',
            display: 'inline-flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '100%',
            transform: 'translate(-50%, -50%)'
        }}>
        {text}
    </div>
)

