import { useRef, useEffect, useState } from "react";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from "mapbox-gl"; 
import axios from "axios";

import { token } from "../../constains/token";
import { useSelector, useDispatch } from "react-redux";
import ShowAds from "../ShowAds/ShowAds";
import { fetchAds } from "../../redux/Slice/adsSlice";



import {
  StarOutlined,
} from '@ant-design/icons';

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import "./mapbox.css";

mapboxgl.accessToken = token;


const Mapbox = ({places, reports, userLocation}) => {
  const mapContainer = useRef(null);
  const btnShow = useRef(null);
  const dispatch = useDispatch();

  const ADS_OF_PLACE_FROM_API = useSelector(state => state.ads.ads)

  const map = useRef(null);
  const [lng, setLng] = useState(userLocation?.lng);
  const [lat, setLat] = useState(userLocation?.lat);
  const [zoom, setZoom] = useState(17);
  const [infoLocation, setInfoLocation] = useState(null);
  const [ads, setAds] = useState(null)
  const [isOpen, setOpen] = useState(false)

  const handleOpen = (value) => {
    setOpen(value)
  }

  const createGeoJson = async (data) => {
    const geoJson = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: data.map((value) => {
          return {
            type: "Feature",
            properties: {
              id: value.id,
              url: value.url,
              address: value.address,
              positiontype_name: value.positiontype_name,
              districts_fullname: value.districts_fullname,
              wards_fullname: value.wards_fullname,
              is_planned: String(value.is_planned),
            },
            geometry: {
              type: "Point",
              coordinates: [value.lng, value.lat],
            },
          };
        }),
      },
    };
    return await geoJson;
  };

  const createReportsGeoJson = async (data) => {
    const geoJson = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: data.map((value) => {
          return {
            type: "Feature",
            properties: {
              id: value.id,
              reporttype_name: value.name,
              email: value.email,
              phone_number: value.phone_number,
              wards_fullname: value.wards_fullname,
              processed: value.processed
            },
            geometry: {
              type: "Point",
              coordinates: [value.lng, value.lat],
            },
          };
        }),
      },
    };
    return await geoJson;
  };

  useEffect(() => {
    if(infoLocation != null){
      setOpen(true);
    }
  },[infoLocation])

  useEffect(() => {
    console.log("ads?.legnth: ", ads)
    if(ads != null){
      setOpen(true);
    }
  },[ads])

  useEffect(() => {
    console.log("ADS_OF_PLACE_FROM_API?.length: ", ADS_OF_PLACE_FROM_API?.length)
    if(ADS_OF_PLACE_FROM_API?.length > 0){
      setAds(ADS_OF_PLACE_FROM_API)
    }
  },[dispatch])


  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [userLocation?.lng, userLocation?.lat],
      zoom: zoom,
    });

    map.current.on("click", (e) => {
      if (true) {
        const lngClicked = e.lngLat.lng;
        const latClicked = e.lngLat.lat;
        axios
          .get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngClicked}%2C%20${latClicked}.json?access_token=${token}`
          )
          .then((res) => {
            console.log("res: ", res.data)
            const place_name = res.data.features[0].text;
            const place_address = res.data.features[0].place_name;
            const wards_fullname = res.data.features[0].context[0].text;
            const districts_fullname = res.data.features[0].context[0].text;

            const dataLocationClicked = {
              name: place_name,
              address: place_address,
              wards_fullname: wards_fullname,
              districts_fullname: districts_fullname,
              lng: lngClicked,
              lat: latClicked,
            }
            setInfoLocation(dataLocationClicked);
          });
        }
    });

    map.current.on('load', async (e) => {
      let marker = new mapboxgl.Marker({draggable: true})
        .setLngLat(userLocation)
        .addTo(map.current)

      if(places){
        const geoJson = await createGeoJson(places);
        console.log('geo json: ', geoJson)
        map.current.addSource("places", geoJson); 

        map.current.addLayer({
          id: 'places',
          type: 'circle',
          source: 'places', // Set the layer source
          paint: {
            'circle-stroke-color': 'white',
            'circle-stroke-width': {
              stops: [
                [0, 5],
                [18, 10]
              ],
              base: 5
            },
            'circle-radius': {
              stops: [
                [12, 5],
                [22, 180]
              ],
              base: 5
            },
            'circle-color': [
              'match',
              ['get', 'is_planned'],
              'true',
              '#008000',
              'false',
              '#FF0000',
              '#FF8C00'
            ]
          }
        });
      }
    })

    map.current.on("click", "places", (e) => {
      const location_id = e.features[0].properties.id;
      const address = e.features[0].properties.address;
      const position_type = e.features[0].properties.positiontype_name;
      const districts_fullname = e.features[0].properties.districts_fullname;
      const wards_fullname = e.features[0].properties.wards_fullname;
      const is_planned = e.features[0].properties.is_planned;
      
      console.log("quy hoach: ", is_planned)

      let popup = new mapboxgl.Popup({
        className: "mapboxgl-popup",
        offset: [0, -10],
        closeButton: true,
      })
        .setLngLat(e.lngLat)
        .setHTML(`<div>
              <div>BẢNG THÔNG TIN</div>
              <div>Loại: ${position_type}</div>
              <div>Phường: ${wards_fullname}</div>
              <div>Quận: ${districts_fullname}</div>
              <div>Địa chỉ: ${address}</div>
              <div>Quy hoạch: ${is_planned == 'true' ? 'Đã quy hoạch' : 'Chưa quy hoạch' }</div>
          </div>`)
        .addTo(map.current);

      dispatch(fetchAds(location_id))
    });


    


    map.current.addControl(
      new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          countries:'vn',
          bbox: [106.358, 10.313, 107.377, 11.183],
          mapboxgl: mapboxgl
      })
    );

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

  });

  const handleData = () => {
    setInfoLocation(null);
  }

  const handleShowPlaces = () => {
    const visibility = map.current.getLayoutProperty(
      'places',
      'visibility',
      'none'
    );

    if (visibility === 'visible') {
      map.current.setLayoutProperty('places', 'visibility', 'none');
    } else {
        map.current.setLayoutProperty(
          'places',
          'visibility',
          'visible'
        );
      }
  }

  return (
    <>
        {isOpen && <ShowAds ads={ads} data={infoLocation} handleData={handleData} handleOpen={handleOpen} />}
        <div className="map-box">
          <button onClick={handleShowPlaces} id="btnShow">Ẩn/Hiện các điểm đặt</button>
          <div className="sidebar">
            Kinh độ: {lng} | Vĩ độ: {lat} | Zoom: {zoom}
          </div>
          <div ref={mapContainer} className="container" />
        </div>
    </>
  );
};

export default Mapbox;
