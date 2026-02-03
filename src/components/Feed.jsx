import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { addFeed } from '../utils/feedSlice';
import Usercard from './Usercard';

const Feed = () => {
  const userData = useSelector((store)=>store.user);
  const feed = useSelector((store)=>store.feed);
  const navigate = useNavigate();
  const dispatch = useDispatch();

//   const fetchUser =async ()=>{
//     try{
//     const res = await axios.get(BASE_URL+"/feed",{withCredentials:true});
//     if(!res.data){
//       return navigate("/login");
//     }
//     dispatch(addUser(res.data));
//     // getFeed();
//   }
//   catch(err){
//     console.log(err.message);
//   }
// }

const getFeed = async()=>{
  try{
    if(feed){
      return;
    }
    const res = await axios.get(BASE_URL+"/feed",{withCredentials:true});
    console.log(res.data);
    dispatch(addFeed(res.data));

  }
  catch(err){
    console.log(err.message);
  }
}
useEffect(()=>{
getFeed();
},[]);


  return (
     feed && (
      <div className="flex justify-center my-10 mb-23">
        <Usercard user={feed[6]}/>

      </div>
  )
)
}

export default Feed