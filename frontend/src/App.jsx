import * as React from 'react';
import { useState, useEffect } from 'react';
import StarIcon from '@mui/icons-material/Star';
import ReactMapGL, { Marker, Popup } from '!react-map-gl';// eslint-disable-line import/no-webpack-loader-syntax

import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';
import { format } from 'timeago.js';
import Login from './components/Login';
import Register from './components/Register';

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';

function App() {
  // const myStorage = window.localStorage;
  const [pins, setPins] = useState([]);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);

  const [currUser, setCurrUser] = useState(null)
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [newPlaceName, setNewPlaceName] = useState("");
  const [newPlaceDesc, setNewPlaceDesc] = useState("");

  const [newRating, setNewRating] = useState(1);

  // console.log(pins);
  const [viewState, setViewState] = React.useState({
    longitude: 50,
    latitude: 37,
    zoom: 4,
    transitionDuration: 1000
  });

  const loginwindow = (e) => {
    e.preventDefault();
    setRegister(false);
    setLogin(true);
  }
  const logoutclick = (e) => {
    e.preventDefault();
    setCurrUser(null)
  }
  const registerwindow = (e) => {
    e.preventDefault();
    setLogin(false);
    setRegister(true);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currUser,
      desc: newPlaceDesc,
      title: newPlaceName,
      rating: newRating,
      long: newPlace.long,
      lat: newPlace.lat
    }
    setNewPlace(null)


    // setNewPlaceDesc(null);
    // setNewPlaceName(null);
    // setNewRating(null);
    try {
      const res = await axios.post('/pins', newPin);
      setPins([...pins, res.data])
    } catch (error) {
      console.log(error);
    }


  }
  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
  };
  const handleAddClick = (e) => {
    e.preventDefault();
    if (currUser == null) {
      setLogin(true)
    }
    else {
      setCurrentPlaceId(null);
      const lat = e.lngLat.lat;
      const long = e.lngLat.lng;

      setNewPlace(
        {
          lat,
          long
        }
      )
    }

  };
  // console.log(pins);
  useEffect(() => {

    const getPins = async () => {
      try {
        const res = await axios.get('/pins')
        setPins(res.data)
        // console.log(res.data);
      } catch (error) {
        console.log(error);
      }

    }
    getPins();
  }, [])

  // console.log(newPlace)
  return (

    <div>


      <ReactMapGL
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        {...viewState}
        transitionDuration="1000"
        onMove={evt => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100vh" }}
        mapStyle="mapbox://styles/mayank-1/clc4wfwnk008514oxwb2nrdcc"

        onDblClick={(handleAddClick)}
      >
        {
          pins.map(p => (
            <>
              <Marker longitude={p.long} latitude={p.lat} anchor="bottom" rotationAlignment="map" pitchAlignment="map">
                <LocationOnIcon
                  style={{ cursor: "pointer" }}
                  // (newUser ==={p.username} ?)
                  className={(currUser) === p.username ? ' text-red-500' : ' text-violet-700'}

                  // 
                  onClick={() => handleMarkerClick(p._id)}
                />

              </Marker>

              {

                p._id === currentPlaceId &&
                (
                  <Popup
                    key={p._id}
                    latitude={p.lat}
                    longitude={p.long}
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() => setCurrentPlaceId(null)}
                    anchor="left"
                  >
                    <div className=' flex-col p-1 space-y-1 '>
                      <div className=' '>
                        <p className=' font-semibold text-red-500 border-b border-red-400'>Place</p>
                        <h4>{p.title}</h4>
                      </div>

                      <div>
                        <p className=' font-semibold  text-red-500 border-b border-red-400'>Review</p>
                        <p>{p.desc}</p>
                      </div>
                      <div className=' text-yellow-400'>
                        {Array(p.rating).fill(<StarIcon />)}

                      </div>
                      <div>
                        <p className=' font-semibold  text-red-500 border-b border-red-400'>Information</p>
                        <p>Created by <b>{p.username}</b></p>
                        <p> {format((p.createdAt))}</p>
                      </div>
                    </div>
                  </Popup>

                )


              }
              {
                newPlace &&
                <Popup
                  // key={p._id}
                  latitude={newPlace.lat}
                  longitude={newPlace.long}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setNewPlace(null)}
                  anchor="left"
                >

                  <form className=' flex-col p-1 space-y-1 ' onSubmit={handleSubmit}>
                    <div className=' '>
                      <p className=' font-semibold text-red-500 border-b border-red-400'>Place</p>
                      <input type='text' placeholder='Enter Place' className=' border-none  focus:outline-none ' onChange={(e) => (setNewPlaceName(e.target.value))} />
                    </div>
                    <div>
                      <p className=' font-semibold  text-red-500 border-b border-red-400'>Description</p>
                      <textarea placeholder='Enter Description ' className='  focus:outline-none ' onChange={(e) => (setNewPlaceDesc(e.target.value))}></textarea>

                    </div>
                    <div>
                      <p className=' font-semibold  text-red-500 border-b border-red-400'>Rating</p>
                      <input type="number" min={1} max={5} className=' focus:outline-none  w-full' onChange={(e) => (setNewRating(e.target.value))} />
                    </div>


                    <div className=''>
                      <button className=' w-full  text-white bg-red-400' type='submit'>
                        Add Pin
                      </button>
                    </div>



                  </form>

                </Popup>

              }
            </>)
          )}
        {currUser ?
          (<div className='absolute z-10 top-1 right-1 p-2'>
            <button className=' bg-blue-600 text-white p-2 rounded-lg w-20 m-1' onClick={logoutclick}>Logout</button>
          </div>)
          :
          <div className='absolute z-10 top-1 right-1 p-2'>
            <button className=' bg-red-600 text-white p-2 rounded-lg w-20 m-1' onClick={loginwindow}>Login</button>
            <button className=' bg-green-600 text-white p-2 rounded-lg w-20 m-1' onClick={registerwindow}>Register</button>
          </div>}

        {login &&
          <Login setCurrUser={setCurrUser} setLogin={setLogin} />
        }

        {register &&
          <Register setCurrUser={setCurrUser} setRegister={setRegister} />
        }
      </ReactMapGL>


    </div>

  );
}

export default App;