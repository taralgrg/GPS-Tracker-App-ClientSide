import React, { useContext } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { NavigationEvents } from "react-navigation";
import { ListItem } from "react-native-elements"; // to render out lists
import { Context as TrackContext } from "../context/TrackContext";

const TrackListScreen = ({ navigation }) => {
  // all data available through TrackContext on the state property.
  const { state, fetchTracks } = useContext(TrackContext);

  console.log(state);

  //chevron shows an icon, styling thing (carrot type logo)

  return (
    <>
      <NavigationEvents onWillFocus={fetchTracks} />
      <FlatList
        data={state} // state is an array with all the objects
        keyExtractor={item => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity>
              <ListItem chevron title={item.name} />
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

TrackListScreen.navigationOptions = () => {
  title: "Tracks";
};

const styles = StyleSheet.create({});

export default TrackListScreen;
