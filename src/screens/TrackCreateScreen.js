// instead of _mockLocation, we can also use pre-made ones: iOs simulator = Debug/Location/.. but it might be buggy
import "../_mockLocation";
import React, { useContext, useCallback } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView, withNavigationFocus } from "react-navigation";
import Map from "../components/Map";
import { Context as LocationContext } from "../context/LocationContext";
import useLocation from "../hooks/useLocation";
import TrackForm from "../components/TrackForm";
import { Ionicons } from "@expo/vector-icons";

const TrackCreateScreen = ({ isFocused }) => {
  const { state, addLocation } = useContext(LocationContext);
  // only give me a new callback function, when the value of recording(state.recording) changes
  //  then we take the resulting callback and pass it to the useLocation(->startwatching->callback)
  const callback = useCallback(
    location => {
      addLocation(location, state.recording);
    },
    [state.recording]
  );
  // useLocation (startwatching(requestPermissionsAsync, watchPositionAsync)) only when
  // either you are in recording screen (isFocused) or when the recording is turned ON
  const [err] = useLocation(isFocused || state.recording, callback);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text h2>Create a</Text>
      <Map />
      {err ? <Text>Please enable location services</Text> : null}
      <TrackForm />
    </SafeAreaView>
  );
};

TrackCreateScreen.navigationOptions = {
  title: "Add Track",
  tabBarIcon: <Ionicons name="ios-add-circle" size={25} />
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);

// const startWatching = async () => {
//   try {
//     const { granted } = await requestPermissionsAsync();
//     if (!granted) {
//       throw new Error('Location permission not granted');
//     }
//   } catch (e) {
//     setErr(e);
//   }
// };
