import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";
import axios from "axios";

const Request = () => {
  const dispatch = useDispatch();
  const requestData = useSelector((store)=>store.requests);

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/interested/connections", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
      console.log(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

    if(!requestData){
        return 
    }
    if(requestData.length===0){
        return <h1>You have no Connections</h1>
    }





  return (
    <div className="text-center my-10">
        <div className='text-bold font-serif text-2xl'>My Connections</div>
        {requestData.map((r)=>{
            const {name,age,photoUrl,gender,about,skills}=r.fromUserId;
            // console.log(connection.toUserId.name);
            return(
            <div className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 max-w-2/5 mx-auto" key={r._id}>
                <div className="flex">
                <div>
                <img className=" my-3 w-20 h-20 rounded-full" alt="user-Image" src={photoUrl}></img>
                </div>
                <div className='text-left mx-4'> 
               <h1 className='font-bold text-xl'>{name}</h1>
               {age && gender && (<p className='font-medium'>{age+","+gender}</p>)}
               <p className='font-light'>{about}</p>
               <p className='font-medium'>Good At: {skills+""}</p>
               <div className="align-text-bottom mx-auto">
                </div>
                </div>
                </div>
                <div className="flex gap-3">
               <button className="btn  bg-green-600 text-white">Accept</button>
               <button className="btn  bg-red-800  text-white">Reject</button>
                </div>
            </div>
            )
            
        })}
    </div>
  )
}






export default Request;
