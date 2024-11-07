import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "320px",
};

const center = {
  lng: 40.728520783781,
  lat: -73.79463386540343,
};

const Map: React.FC = () => {
  return (
    <div>
      <h2 className="text-white text-center text-3xl font-bold">Visit Us</h2>
      <div className="p-10">
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default Map;
