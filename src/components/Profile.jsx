import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import Navbar from "./navbar";


const Profile=()=>{
    const navigate = useNavigate();
    const checkLogIn =async()=>{
        const userData= await useSelector((store)=>store.user);
        if(!userData){
            return navigate("/login")
        }
    }
    useEffect(()=>{
        checkLogIn()
    },[])


    return(
        <div>
            <p>THis is profile page</p>
        </div>
    )
}

export default Profile;