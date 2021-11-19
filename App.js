import MapView, {Marker, Geojson} from 'react-native-maps';
import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Dimensions } from 'react-native';

const geodata = require('./assets/bicycles_geojson_2021-11-12.json');
const geodata1 = require('./assets/parking_geojson_2021-11-17.json');

function App() {
  return (
    <MapView style={styles.map}>
      <Geojson geojson={geodata} lineDashPattern={[1]} strokeWidth={4}/>
      <Geojson geojson={geodata1} lineDashPattern={[1]} strokeWidth={4} strokeColor='yellow'/>
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;