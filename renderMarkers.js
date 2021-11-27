import React, { Component } from "react";
import { View } from "react-native";
import { Marker, Geojson } from "react-native-maps";


const services = require("./assets/services.json");
const parkings = require("./assets/parkings.json");
const kiwi = require("./assets/kiwi.json");
const ewings = require("./assets/ewings.json");

const parkingIcon = require("./assets/parking.png");
const serviceIcon = require("./assets/service.png");


class RenderMarker extends Component {
    constructor(props) {
        super(props),
        this.state = {
            services: false,
            parking: false,
            kiwi: false,
            ewings: false,
        }
    }

    showMarkers(geojson, icon)
    {
        return geojson.features.map((element, index) => (
                <Marker
                coordinate={{ latitude: element.geometry.coordinates[1], longitude: element.geometry.coordinates[0]} }
                icon={icon}
                key={index}
            />
        ))
    }

    setRenderMarkers(s)
    {
        this.setState(s);
    }

    render() {
        return (
            <View initialRegion={{
                latitude: 52.5,
                longitude: 19.2,
                latitudeDelta: 8.5,
                longitudeDelta: 8.5,
              }}>
                { this.state.parking && this.showMarkers(parkings, parkingIcon) }
                { this.state.services && this.showMarkers(services, serviceIcon) }
                { this.state.ewings && <Geojson geojson={ewings} lineDashPattern={[1]} fillColor="rgba(48, 235, 45, 0.49)"/> }
                { this.state.kiwi && <Geojson geojson={kiwi} lineDashPattern={[1]} fillColor="rgba(48, 235, 45, 0.49)"/> } 
            </View>
        )
    }
}

export default RenderMarker;