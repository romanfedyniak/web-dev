import MapView from 'react-native-map-clustering';
import React, { useRef } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import Search from './search';
import Direction from './direction';
import { Marker } from 'react-native-maps';
import { Popup } from './PopUp';
import RenderMarker from './renderMarkers';


const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.002;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


function getCurrentPosition() {
  return new Promise(async (resolve, reject) => {
    try {
      await Location.requestForegroundPermissionsAsync();
    }
    catch{}

    let location = await Location.getCurrentPositionAsync({});
    location = {coords: {latitude: "49.84585596004817", longitude: "24.026068729812227"}}
    resolve(location);
  });
}

function App() {
  const mapRef = useRef(null);
  const directionRef = useRef(null);
  const popupRef = useRef(null);
  const renderMarkersRef = useRef(null);

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
      <Popup ref={popupRef} title="Filter" onTouchOutside={() => { renderMarkersRef.current.setRenderMarkers(popupRef.current.getCheckbox()); popupRef.current.close();}}></Popup>
      <MapView ref={mapRef} initialRegion={{
  latitude: 52.5,
  longitude: 19.2,
  latitudeDelta: 8.5,
  longitudeDelta: 8.5,
}} style={styles.map} >
        <RenderMarker ref={renderMarkersRef}/>
        <Direction ref={directionRef}></Direction>
        <Marker onPress={async() => {directionRef.current.makeDirection(await getCurrentPosition(), "24.063099,49.8430112")}} title="Шевченківський гай" coordinate={{latitude: 49.84301126547157, longitude: 24.063099958587234}}/>
      </MapView>
      <Search showFilters={() => {popupRef.current.open()}} onSubmitEditing={async(event, text) => {directionRef.current.makeDirection(await getCurrentPosition(), text)}}></Search>
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