import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body =()=>{
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const userData = useSelector((store)=>store.user);
    const fetchUser = async () =>{
        try{
            const res = await axios.get(BASE_URL+"/profile",{withCredentials:true});
            dispatch(addUser(res.data));
        }
        catch(err){
            if(err.status===401){
                navigate("/login");
            }
            else{
                console.log(err);
            }
        }
    }
    useEffect(()=>{
        if(!userData){  //to not make an api call if userData or token is present 
            fetchUser()
        }
    },[]);

   

    return(
    
        <div>
            <Navbar/>
            <Outlet/>  {/*This will render child routes of body always below the navbar*/}
            <Footer/>
        </div>
    )
}

export default Body;