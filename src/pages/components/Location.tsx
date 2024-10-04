import { ReactElement } from "react";
import { useMyStore } from "../../store";
import { Anchor } from "@mantine/core";

const Location = (): ReactElement => {
    const {
        location,
        locationStatus,
        setLocation,
        setLocationStatus,
    } = useMyStore();


    const geoFindMe = (): void => {
        const success = (position: { coords: { latitude: number; longitude: number; }; }): void => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            setLocationStatus("");
            setLocation(latitude, longitude);
        };

        const error = (): void => {
            setLocationStatus("Unable to retrieve your location");
        };

        if (!navigator.geolocation) {
            setLocationStatus("Geolocation is not supported by your browser");
        } else {
            setLocationStatus("Locating…");
            navigator.geolocation.getCurrentPosition(success, error);
        }
    };

    return (
        <div>
            <button onClick={geoFindMe}>Show my location</button>
            <p>{locationStatus}</p>
            {location && <Anchor href={`https://map.google.com/maps?q=${location.lat},${location.lon}`} target="_blank"> Latitude: {location.lat}, Longitude: {location.lon}</Anchor>}
        </div>
    );
};

export default Location;