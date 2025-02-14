import React, { useEffect, useState } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow, LoadScriptNext } from "@react-google-maps/api";
import axios from 'axios'
import { useAuthStore } from '../store/authStore';
import { star } from '../assets';



const containerStyle = {
  width: "100%",
  height: "100vh",
};



const API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
const GoogleMapPage = ({add}) => {
  
  console.log("Addresse",add);
  let center = { lat: 28.6139, lng: 77.2090} ;
  if(add){
    center = add;
  }
  
  const [googleMap, setMap] = useState(null);
  const {places, fetchData, library} = useAuthStore();
  const [selectedHospital, setSelectedHospital] = useState(null);
  
  
  const url = "https://places.googleapis.com/v1/places:searchNearby";

  const requestBody = {
    includedTypes: ["hospital"],
    maxResultCount: 10,
    locationRestriction: {
      circle: {
        center: { latitude: center.lat, longitude: center.lng },
        radius: 5000.0,
      },
    },
  };
  useEffect(() => {
    if(add){
      fetchData(url, requestBody, API_KEY)
    }
    console.log("places: ", places)
  },[googleMap,add]);
  
  return (
    <div>
        <LoadScriptNext googleMapsApiKey={API_KEY} libraries={library}>
            <GoogleMap
             mapContainerStyle={containerStyle} 
             center={center} 
             zoom={10}
             onLoad={(map)=> setMap(map)}
             
            >
              <Marker position={center} label="Your location" />
              {places.map((place, index)=>(
                  <Marker 
                  key={index} 
                  position={{lat:place.location.latitude, lng:place.location.longitude}} 
                  title={place.formattedAddress}  
                  label={{ text:"🏥", fontSize:"24px", color:'red'}} 
                  
                  onClick={()=>setSelectedHospital(place)}
                    />
                ))}
                {selectedHospital && (
                  <InfoWindow 
                    position={{lat:selectedHospital.location.latitude, lng:selectedHospital.location.longitude}}
                    onCloseClick={()=> setSelectedHospital(null)}
                  >
                    <div>
                      <h2 className='text-2xl font-bold'>{selectedHospital.displayName.text}</h2>
                      <p className='my-2'>{selectedHospital.formattedAddress}</p>
                      {selectedHospital.rating && (<p className=' mb-2 flex items-center'><span className='font-semibold'>Rating :</span> {selectedHospital.rating} <img className='p-[2px]' src={star} height={5} width={16} /> ({selectedHospital.userRatingCount})</p>)}
                      <p><span className='font-semibold'>Check on google map : </span><a target='_blank' className='hover:underline' href={selectedHospital.googleMapsUri}>Google Map Link</a></p>
                    </div>
                  </InfoWindow>
                )}
            </GoogleMap>
        </LoadScriptNext>
    </div>
  )
}

export default GoogleMapPage