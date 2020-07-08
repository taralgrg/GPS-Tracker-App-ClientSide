import { useState, useEffect } from "react";
import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync
} from "expo-location";

// custom hook, we are putting together that accepts a boolean value (shouldtrack) and callback function.
// shouldTrack ==== isFocused, but because isFocused(imported from withNavigationFocus only available in useLocation)
// in here, we call it shouldTrack because isFocused is not callable from here
export default (shouldTrack, callback) => {
  // if error is null, everything is ok, if not setErr in catch.
  const [err, setErr] = useState(null);
  // const [subscriber, setSubscriber] = useState(null);

  // we want to run the component one time, when the component is first displayed in screen
  useEffect(() => {
    let subscriber;
    const startWatching = async () => {
      try {
        // prompts users for permission of tracking location
        await requestPermissionsAsync();
        // watches(starts tracking) the user location and sees it change over time
        // watchPostionAsync gives back value called subscriber which has function called remove that stops tracking the users location.
        const subscriber = await watchPositionAsync(
          {
            // higher the accuracy , higher the battery consumption
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10
          },
          // callback gets called everytime we see a new location.
          callback
        );
      } catch (e) {
        setErr(e);
      }
    };

    // if 'isFocused' is true, aka. if we are on the track create screen.
    if (shouldTrack) {
      startWatching();
    } else {
      if (subscriber) {
        subscriber.remove();
      }
      subscriber = null; // dont need subscriber anymore, so set it to null
    }

    // Clean-up function
    return () => {
      //if we have a subscriber, stop listening to it by using the remove function
      if (subscriber) {
        subscriber.remove();
      }
    };
    // we will always be working with exact same function on the memory, until the value of recording(state.recording)
    // inside the callback function changes
  }, [shouldTrack, callback]);

  return [err];
};
