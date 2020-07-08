import { useContext } from "react";
import { Context as TrackContext } from "../context/TrackContext";
import { Context as LocationContext } from "../context/LocationContext";
import { navigate } from "../navigationRef";

export default () => {
  const { createTrack } = useContext(TrackContext);
  const {
    state: { locations, name },
    reset
  } = useContext(LocationContext);

  // goal of a hook function is to expose some reusable functionality to some different componenets
  // inside of our application
  const saveTrack = async () => {
    // after await successfully creating a track do some cleanup and reset the form (a.k.a change state)
    await createTrack(name, locations);
    reset();
    navigate("TrackList");
  };

  return [saveTrack];
};
