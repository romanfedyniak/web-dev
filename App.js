import MapView from 'react-native-maps';
import React, { useRef } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import Search from './search';
import Direction from './direction';


const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.002;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const geodata = require('./assets/bicycles_geojson_2021-11-12.json');


function getCurrentPosition() {
  return new Promise(async (resolve, reject) => {
    try {
      await Location.requestForegroundPermissionsAsync();
    }
    catch{}

    let location = await Location.getCurrentPositionAsync({});
    console.log(location.coords);
    resolve(location);
  });
}

function App() {
  const mapRef = useRef(null);
  const directionRef = useRef(null);

  getCurrentPosition().then(location => {
    mapRef.current.animateToRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }, 1000);
  });

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.map}>
        <Direction ref={directionRef}></Direction>
      </MapView>
      <Search onSubmitEditing={async(event, text) => {directionRef.current.makeDirection(await getCurrentPosition(), text)}}></Search>
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  container:{
    flex:1,
  },
  
});

export default App;