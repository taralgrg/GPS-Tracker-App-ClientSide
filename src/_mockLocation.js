// test only file, not for production
// instead of _mockLocation, we can also use pre-made ones: iOs simulator = Debug/Location/..
import * as Location from "expo-location";

// represents around 10m in latitude and longitude
const tenMetersWithDegrees = 0.0001;

// tricks expo location that our device is moving around
// takes a variable increment which is a counter
const getLocation = increment => {
  return {
    timestamp: 10000000,
    coords: {
      speed: 0,
      heading: 0,
      accuracy: 5,
      altitudeAccuracy: 5,
      altitude: 5,
      longitude: 114.177177 + increment * tenMetersWithDegrees,
      latitude: 22.25248 + increment * tenMetersWithDegrees
    }
  };
};

let counter = 0;
// this is where we trick out the location.
setInterval(() => {
  // once everysecond location will be changed
  Location.EventEmitter.emit("Expo.locationChanged", {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter)
  });
  counter++;
}, 1000);
