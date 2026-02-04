import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";  //you could give any name to the import object.It would be always userSlice.reducer and it is an object containg all reducer methods of the userSlice
{/* A reducer decide how the state will change when an action is dispatched*/} 
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestSlice";

    const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections:connectionReducer,
    requests: requestReducer
  },
}); 

export default appStore;
