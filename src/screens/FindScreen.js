import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView,{Marker} from 'react-native-maps';

export default class FindScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <MapView style={{flex: 1, width:400, height:400, marginTop:10}}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    showsUserLocation
                    showsMyLocationButton
                >
                <Marker coordinate={{latitude: 37.78825, longitude: -122.4324  }} ></Marker>
                </MapView>
            </View>
        )
    } 
}

const styles = StyleSheet.create({
    container: {
        width: 400,
        height: 400,
        // flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})