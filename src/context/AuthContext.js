import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    // dont need to persist existing state obj, we need to  reset the state
    // obj from scratch. Eg. when user signs up with invalid email, he gets an error
    // message. When a user then signs up, we dont want to have error message again.
    // when user signs out and goes back to signup form, they will see the error message.
    // So we need to reset the state when users signup
    case "signin":
      return { errorMessage: "", token: action.payload };
    // sign up returns the same thing as signin, so we use signin for both.
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
    navigate("TrackList");
  } else {
    navigate("loginFlow");
  }
};

// when we signin with a wrong details, we get displayed a login error. After which, when we navigate to
// signup screen via the button, the error message is still displayed because the "add_error" case
// handles signup/singin both in authReducer. To tackle the issue, we will create a clearError action function.
const clearErrorMessage = dispatch => () => {
  dispatch({ type: "clear_error_message" });
};

const signup = dispatch => async ({ email, password }) => {
  // make api request (express api) to signup with that email and password.
  // if we sign up, modify our state, and say that we are authenticated.
  // if signing up fails, we probably need to reflect and error message.
  try {
    const response = await trackerApi.post("/signup", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signin", payload: response.data.token });

    // navigate to main flow
    navigate("TrackList");
  } catch (err) {
    // console.log(err);
    dispatch({
      type: "add_error",
      payload: "Something went wrong with Signup"
    });
  }
};

const signin = dispatch => async ({ email, password }) => {
  // try to sign in
  // Handle success by updating state
  // Handle failure by showing error message (somehow)
  try {
    const response = await trackerApi.post("/signin", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signin", payload: response.data.token });
    navigate("TrackList");
  } catch (err) {
    console.log(err);
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in"
    });
  }
};

const signout = dispatch => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
  navigate("loginFlow");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: "" }
);
