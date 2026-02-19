import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
    name:"review",
    initialState:[],
    reducers:{
        addReview:(state,action)=>{
            return action.payload;
        },
        deleteReview:(state,action)=>{
            const newArray = state.filter(r=> r._id !=action.payload);
            return newArray;
        }

    }
})

export const {addReview,deleteReview} = reviewSlice.actions;
export default reviewSlice.reducer;