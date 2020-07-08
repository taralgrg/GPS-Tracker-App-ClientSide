import React, { useContext } from "react";
import { Text, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Circle, Polyline } from "react-native-maps";
import { Context as LocationContext } from "../context/LocationContext";

const Map = () => {
  const {
    state: { currentLocation, locations }
  } = useContext(LocationContext);

  // console.log(locations);
  if (!currentLocation) {
    // activityIndicator is the spinner/loading icon
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        ...currentLocation.coords, // (inside currentlocation has coords) coords object has the latitude and longitude
        latitudeDelta: 0.01, // how zoomed in it is
        longitudeDelta: 0.01
      }}
      // re-centers the map, even when the user drags it
      // region={{
      //   ...currentLocation.coords, // coords object has the latitude and longitude
      //   latitudeDelta: 0.01, // how zoomed in it is
      //   longitudeDelta: 0.01
      // }}
    >
      {/* Draw circle on the map. React native is going to take the latitude and
       longitude out of the coords.  */}
      <Circle
        center={currentLocation.coords}
        radius={30}
        strokeColor="rgba(158,158,255,1.0)"
        fillColor="rgba(158,158,255,0.3)"
      />
      <Polyline coordinates={locations.map(loc => loc.coords)} />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300
  }
});

export default Map;
