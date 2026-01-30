import {useState} from "react";
import axios from "axios";
const Signup = ()=>{

    const [name,setName] = useState("");
    const [age,setAge] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSignup =async()=>{
        try{
            const res = await axios.post("http://localhost:9193/signup",{
                name,
                age,
                email,
                password
            })
            console.log(res);
            alert("You are successfuly registered"+name+"!");
            console.log(res.data);
        
        }
        catch(err){
            console.error(err);
        }
    }
        

    return(
            <div className="flex justify-center mt-10">
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