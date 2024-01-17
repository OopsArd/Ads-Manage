import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import Mapbox from "./components/Mapbox/Mapbox";
import HomePage from './pages/CB_PHUONG/CB_PHUONG'
import LoginForm from "./pages/LoginPage/LoginForm";

import { LoadingOutlined } from '@ant-design/icons'

import { fetchPlaces } from "./redux/Slice/placeSlice";
import { fetchReports } from "./redux/Slice/reportSlice";

import "./App.css";

const role = localStorage.getItem('role');

function App() {
  const dispatch = useDispatch();
  const places = useSelector(state => state.places.places)
  const reports = useSelector(state => state.reports.reports)
  const status = useSelector(state => state.places.status)

  const [userLocation, setUserLocation] = useState(null);
  
  useEffect(() => {
    dispatch(fetchPlaces());
 },[dispatch])

  useEffect(() => {
    dispatch(fetchReports());
 },[dispatch])

 useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Lấy vị trí thành công
        const { latitude, longitude } = position.coords;
        setUserLocation({ lng: longitude, lat: latitude });
      },
      (error) => {
        console.error('Error getting user location:', error.message);
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
}, []);

 if(status == 'loading'){
  return (
    <div className="loading">
      <LoadingOutlined />
    </div>
  )
}

if(status == 'error'){
  return (
    <div>
      <div>Error: {error}</div>
    </div>
  )
}

if(role == 1){
  return(
    <>
      {places && reports && userLocation && <HomePage  places={places} reports={reports} userLocation={userLocation} />}
    </>
  )
}

const handlePlaces = () => {
  dispatch(fetchPlaces());
}

  return (
    <>
      {places && reports && userLocation && <Mapbox  places={places} reports={reports} userLocation={userLocation}/>}
    </>
  )
}

export default App;
