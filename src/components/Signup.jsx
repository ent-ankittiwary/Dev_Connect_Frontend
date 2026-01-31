import {useEffect, useState} from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";



const Signup = ()=>{
  const dispatch = useDispatch();
  const navigate =useNavigate();
    const [name,setName] = useState("");
    const [age,setAge] = useState("");
    const [photoUrl,setPhotoUrl] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSignup =async()=>{

        try{
            const res = await axios.post(BASE_URL+"/signup",{
                name,
                age,
                photoUrl,
                email,
                password
            },{withCredentials:true})
            console.log(res);
            if(res.data.success){
              alert("You are successfuly registered "+name+"!");
              dispatch(addUser(res.data.cust1));
              console.log(res.data);
              navigate("/feed");
            }
            else{
              alert("Something went wrong");
              throw new Error("check all feilds,if already registered please Login")
            }
        }
        catch(err){
            console.error(err);
        }
    }
        

    return(
            <div className="flex justify-center mt-5 mb-20">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title">Register Yourself here!</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Name: {name}</legend>
              <input type="text" value={name} className="input" placeholder="Name" onChange={(e)=>setName(e.target.value)}/>
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Age: {age}</legend>
              <input type="text" value={age} className="input" placeholder="Age" onChange={(e)=>setAge(e.target.value)} />
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">PhotoUrl: {photoUrl}</legend>
              <input type="text" value={photoUrl} className="input" placeholder="Paste image URL here" onChange={(e)=>setPhotoUrl(e.target.value)} />
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID : {email}</legend>
              <input type="text" value={email} className="input" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password : {password}</legend>
              <input type="text" value={password} className="input" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
            </fieldset>
          </div>
          <div className="flex justify-center">
          <button className="btn btn-primary my-5" onClick={handleSignup}>Signup</button>
          </div>
        </div>
      </div>
    </div>
    )
}

export default Signup;




// import { useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";

// const Signup = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [photoUrl, setPhotoUrl] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSignup = async () => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/signup",
//         {
//           name,
//           age,
//           photoUrl,
//           email,
//           password,
//         },
//         { withCredentials: true }
//       );

//       // ✅ check proper success flag from backend
//       if (res.data.success) {
//         alert("You are successfully registered, " + res.data.cust1.name + "!");
//         dispatch(addUser(res.data.cust1));
//         // navigate("/login"); // go to login page after signup
//       } else {
//         alert(res.data.message || "Signup failed");
//       }

//     } catch (err) {
//       console.error(err);
//       alert("Signup failed");
//     }
//   };

//   return (
//     <div className="flex justify-center mt-5 mb-20">
//       <div className="card card-border bg-base-300 w-96">
//         <div className="card-body">
//           <h2 className="card-title">Register Yourself here!</h2>

//           <fieldset className="fieldset">
//             <legend className="fieldset-legend">Name</legend>
//             <input
//               type="text"
//               value={name}
//               className="input"
//               placeholder="Name"
//               onChange={(e) => setName(e.target.value)}
//             />
//           </fieldset>

//           <fieldset className="fieldset">
//             <legend className="fieldset-legend">Age</legend>
//             <input
//               type="text"
//               value={age}
//               className="input"
//               placeholder="Age"
//               onChange={(e) => setAge(e.target.value)}
//             />
//           </fieldset>

//           <fieldset className="fieldset">
//             <legend className="fieldset-legend">Photo URL</legend>
//             <input
//               type="text"
//               value={photoUrl}
//               className="input"
//               placeholder="Paste image URL"
//               onChange={(e) => setPhotoUrl(e.target.value)}
//             />
//           </fieldset>

//           <fieldset className="fieldset">
//             <legend className="fieldset-legend">Email</legend>
//             <input
//               type="text"
//               value={email}
//               className="input"
//               placeholder="Email"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </fieldset>

//           <fieldset className="fieldset">
//             <legend className="fieldset-legend">Password</legend>
//             <input
//               type="password"
//               value={password}
//               className="input"
//               placeholder="Password"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </fieldset>

//           <div className="flex justify-center">
//             <button className="btn btn-primary my-5" onClick={handleSignup}>
//               Signup
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;
