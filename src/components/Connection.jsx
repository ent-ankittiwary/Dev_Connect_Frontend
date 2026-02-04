import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { addConnections } from '../utils/connectionSlice';

const Connection = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store)=>store.connections);


    const fetchConnections = async()=>{
        try{
            const res = await axios.get(BASE_URL+"/accepted/connections",{withCredentials:true});
            console.log(res.data.data);
            dispatch(addConnections(res?.data?.data))

        }
        catch(err){
            console.log(err.message);
        }
    }

    useEffect(()=>{
        fetchConnections()
    },[]);

    if(!connections){
        return;
    }
    if(connections.length===0){
        return <h1>You have no Connections</h1>
    }





  return (
    <div className="text-center my-10">
        <div className='text-bold font-serif text-2xl'>My Connections</div>
        {connections.map((connection)=>{
            const {name,age,photoUrl,gender,about,skills}=connection.toUserId;
            // console.log(connection.toUserId.name);
            return(
            <div className="flex   m-4 p-4 rounded-lg bg-base-300 max-w-1/2 mx-auto" key={connection._id}>
                <div>
                <img className=" my-3 w-20 h-20 rounded-full" alt="user-Image" src={photoUrl}></img>
                </div>
                <div className='text-left mx-4'> 
               <h1 className='font-bold text-xl'>{name}</h1>
               {age && gender && (<p className='font-medium'>{age+","+gender}</p>)}
               <p className='font-light'>{about}</p>
               <p className='font-medium'>Good At: {skills+""}</p>
                </div>
            </div>
            )
            
        })}
    </div>
  )
}

export default Connection