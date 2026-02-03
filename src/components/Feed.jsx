// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// function Feed(){
//     const feed = useSelector((store)=>store.feed);
//     const dipatch =useDispatch();

//     useEffect(()=>{
//         getFeed()
//     },[]);

//     const navigate = useNavigate();
//     const userData =useSelector((store)=>store.user);
//     useEffect(()=>{
//         if(userData){
//             return navigate("/feed");
//         }
//     },[])

//     const getFeed =async()=>{

//         if(feed){
//             return;
//         }
//         try{
//             const res = await axios.get(BASE_URL+"/feed",{withCredentials:true});
//             dispatchEvent(addFeed(res.data));
//         }
//         catch(err){
//         return err?.response?.data;
//         }
//     }



//     return(
//         <div>
//             This is the feed page
//         </div>
//     )
// }

// export default Feed;


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { addUser } from "../utils/userSlice";
import Usercard from "./Usercard";

function Feed() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const feed = useSelector((store) => store.feed);
  const userData = useSelector((store) => store.user);

  // ✅ Step 1: Ensure user is authenticated
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(BASE_URL + "/profile", {
          withCredentials: true,
        });
        dispatch(addUser(res.data));
      } catch (err) {
        navigate("/login", { replace: true });
      }
    };

    if (!userData) {
      fetchUser();
    }
  }, [userData, dispatch, navigate]);

  // ✅ Step 2: Fetch feed ONLY after userData exists
  useEffect(() => {
    const getFeed = async () => {
      try {
        const res = await axios.get(BASE_URL + "/feed", {
          withCredentials: true,
        });
        dispatch(addFeed(res.data));
      } catch (err) {
        console.error(err);
      }
    };

    if (userData && !feed) {
      getFeed();
    }
  }, [userData, feed, dispatch]);

  return(
    feed &&(

    <div className="flex justify-center my-10">
        {<Usercard user={feed[5]}/>}
    </div>
    ) 
  ) 
}

export default Feed;
