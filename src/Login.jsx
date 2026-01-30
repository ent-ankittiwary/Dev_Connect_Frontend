import {useState} from "react";
import axios from "axios";
const Login =()=>{
    const [email,setEmail] =useState("");  
    const [password,setPassword] =useState("");
    
    const handleLogin =async()=>{
            try{
                const res = await axios.post("http://localhost:9193/login",{
                    email,
                    password,
                },{
                    withCredentials:true
                }

            )
                alert("Welcome Back! "+res.data.name);
                
                

            }
            catch(err){
                console.error(err);

            }
        };

  return (
    <div className="flex justify-center mt-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID: {email}</legend>
              <input type="text" value={email} className="input" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password : {password}</legend>
              <input type="text" value={password} className="input" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
            </fieldset>
          </div>
          <div className="flex justify-center">
          <button className="btn btn-primary my-5" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
