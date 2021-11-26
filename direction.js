import { Polyline, Geojson } from 'react-native-maps';
import { Alert, View } from 'react-native';
import React, { Component } from 'react';

const token = "5b3ce3597851110001cf62482aaf657c34df44068c64b8e72e426522";

class Direction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      makedPath: false,
    };
  }

  makeDirection(start, end) {
    fetch("https://api.openrouteservice.org/v2/directions/cycling-electric/geojson", {
      method: "POST",
      headers: {
        'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: `{"coordinates":[[${start.coords.longitude},${start.coords.latitude}],[${end}]],"radiuses":[1000]}`,
    })
    .then(responce => {return responce.json()})
    .then(responce => {
      if (responce.hasOwnProperty('error')) {
        Alert.alert(
          "Помилка",
          `Неможливо побудувати маршрут, код помилки: ${responce.error.code}`,
          [
            {text: "Ok"},
          ]
        )
        return
      }
      let coords = responce.features[0].geometry.coordinates.map(element => {return {
          latitude: element[1],
          longitude: element[0],
        }});
      this.setState({
        makedPath: true,
        coords: coords,
      })
    })
  }

  render() {
    return (
      <View>
        { this.state.makedPath && <Polyline coordinates={this.state.coords} lineDashPattern={[10]} strokeColor="red" strokeWidth={10}/> }
      </View>
    )
  }
}

export default Direction;