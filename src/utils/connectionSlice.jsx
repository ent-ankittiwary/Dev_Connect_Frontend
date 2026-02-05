import { createSlice } from "@reduxjs/toolkit";
import { addUser } from "./userSlice";

const connectionSlice = createSlice({
    name:"connection",
    initialState:null,
    reducers:{
        addConnections:(state,action)=>{
            return action.payload;
        },
        removeConnections:(state,action)=>{
            return null;
        }

        
    }
})

export const {addConnections,removeConnection} = connectionSlice.actions;
export default connectionSlice.reducer;

