import axios from "axios";
//To create new tracks, we dont want to do authentication for every request.
//Therefore, we use asyncstorage to store the JWT in the device, for authentication sessions.
import { AsyncStorage } from "react-native";

const instance = axios.create({
  baseURL: "http://5288d761d059.ngrok.io"
});

// instance.interceptors.response.use(
//
//   async config => {
//     const token = await AsyncStorage.getItem("token"); // pulling the token out of storage (if we have)
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },

//
//   err => {
//     return Promise.reject(err);
//   }
// );

// export default instance;

// 1) First function is a config object, it gets called automatically when we are making a request.
// if we have a token via axios, then it be automatically added.
// 2) Second function gets called automatically, if any error exists.
instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

export default instance;
