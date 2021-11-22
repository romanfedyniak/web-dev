import MapView, {Marker, Geojson} from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, Dimensions } from 'react-native';
import { Location, Permissions } from "expo";

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const geodata = require('./assets/bicycles_geojson_2021-11-12.json');
// const mapgeo = require('./assets/map.json');
// const map_lines = require('./assets/map_lines.json');

let token = "5b3ce3597851110001cf62482aaf657c34df44068c64b8e72e426522";

const getDirections = async(start, end) => {
  let responce = await fetch("https://api.openrouteservice.org/v2/directions/cycling-electric/geojson", {
    method: "POST",
    headers: {
      'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: `{"coordinates":[[${start}],[${end}]]}`,
  });

  let responceJson = await responce.json();
  return responceJson;
}

const getLocationAsync = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
}

function App() {
  const [geodata1, setGeodata1] = useState([]);
  const [location, setLocation] = useState([]);

  useEffect(() => {
    getDirections("23.995932,49.83653", "24.0116850,49.724795")
      .then(responseJson => setGeodata1(responseJson))
      .catch(err => console.log("Something went wrong"));
    // (async () => {
    //   await getLocationAsync();
    //   let location = await Location.getCurrentPositionAsync();
    //   setLocation(location);
    // })();
  }, []);


  // let initialPosition = {
  //   latitude: 0,
  //   longitude: 0,
  //   latitudeDelta: 0,
  //   longitudeDelta: 0,
  // };

  return (
    <MapView style={styles.map}>
      <Geojson geojson={geodata} lineDashPattern={[1]} strokeWidth={4}/>
      {geodata1 && <Geojson geojson={geodata1} lineDashPattern={[1]} strokeWidth={4} strokeColor="green"/>}
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;