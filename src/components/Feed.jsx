import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { addFeed } from '../utils/feedSlice';
import Usercard from './Usercard';
import Reviews from './Reviews';
import ReviewSection from './ReviewSection';

const Feed = () => {
  const userData = useSelector((store)=>store.user);
  const feed = useSelector((store)=>store.feed);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

const getFeed = async()=>{
  try{
    if(feed){
      return;
    }
    const res = await axios.get(BASE_URL+"/feed",{withCredentials:true});
    console.log(res.data);
    // console.log(res.data[0]._id);
    dispatch(addFeed(res.data));

  }
  catch(err){
    console.log(err.message);
  }
}
useEffect(()=>{
getFeed();
},[feed]);

if(!feed){
  return;
}

if(feed.length<=0) return <h1 className="flex justify-center font-extrabold text-5xl my-10" >No new Users Found</h1>
  return (
    feed && (
      <div className='flex justify-center my-10 gap-10 m-auto'>
        <Usercard user ={feed[0]}/>
        {/* <ReviewSection feedReview = {feed[0]._id}/> */}
      </div>
    )
  )

}

export default Feed