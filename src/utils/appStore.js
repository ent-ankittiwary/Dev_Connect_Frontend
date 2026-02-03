import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";  //you could give any name to the import object.It would be always userSlice.reducer and it is an object containg all reducer methods of the userSlice
{/* A reducer decide how the state will change when an action is dispatched*/} 
import feedReducer from "./feedSlice";

    const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
  },
}); 

export default appStore;
