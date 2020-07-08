import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker"; // Axios instance

const trackReducer = (state, action) => {
  switch (action.type) {
    // throw away watever state we have and trust the data we get from API as truth source.
    case "fetch_tracks":
      return action.payload;
    default:
      return state;
  }
};

const fetchTracks = dispatch => async () => {
  const response = await trackerApi.get("/tracks");
  dispatch({ type: "fetch_tracks", payload: response.data });
};

const createTrack = dispatch => async (name, locations) => {
  // make a request to our api
  // console.log(name, locations.length);
  await trackerApi.post("/tracks", { name, locations });

  // console.log(name, locations.length);
};

export const { Provider, Context } = createDataContext(
  trackReducer,
  { fetchTracks, createTrack },
  []
);
