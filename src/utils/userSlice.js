import { createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:null,
    reducers:{
        addUser:(state,action)=>{
            return action.payload;
        },
        removeUser:(state,actions)=>{
            return null;
        }
    }

})
export const {addUser,removeUser} = userSlice.actions; //so That we can use all reducer fxn itself without refeering its Slice name
export default userSlice.reducer;