import { configureStore } from "@reduxjs/toolkit";
import placeReducer from "./Slice/placeSlice";
import adsReducer from './Slice/adsSlice'
import reportReducer from "./Slice/reportSlice";

const store = configureStore({
    reducer: {
      places: placeReducer,
      ads: adsReducer,
      reports: reportReducer
    },
});
  
export default store;