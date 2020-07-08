import createDataContext from "./createDataContext";

const locationReducer = (state, action) => {
  switch (action.type) {
    case "add_current_location":
      return { ...state, currentLocation: action.payload };
    case "start_recording":
      return { ...state, recording: true };
    case "stop_recording":
      return { ...state, recording: false };
    // adding a location, without changing the old locations.
    // take locations, and throw them into new array and also add in the payload we just added.
    case "add_location":
      return { ...state, locations: [...state.locations, action.payload] };
    case "change_name":
      return { ...state, name: action.payload };
    case "reset":
      return { ...state, name: "", locations: [] };
    default:
      return state;
  }
};

const changeName = dispatch => name => {
  dispatch({ type: "change_name", payload: name });
};

// action function to update the recording track.
const startRecording = dispatch => () => {
  // just turn the recording flag to true
  dispatch({ type: "start_recording" });
};

const stopRecording = dispatch => () => {
  // just turn the recording flag to false
  dispatch({ type: "stop_recording" });
};

//when we get a updated location from the useLocation hook
const addLocation = dispatch => (location, recording) => {
  dispatch({ type: "add_current_location", payload: location });
  // console.log(recording);
  if (recording) {
    dispatch({ type: "add_location", payload: location });
  }
};

const reset = dispatch => () => {
  dispatch({ type: "reset" });
};

export const { Context, Provider } = createDataContext(
  locationReducer,
  { startRecording, stopRecording, addLocation, changeName, reset },
  { name: "", recording: false, locations: [], currentLocation: null } // initial (state object)
);
