import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";



const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store)=>store.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async () => {
  try {
    const res = await axios.post(
      BASE_URL + "/login",
      { email, password },
      { withCredentials: true }
    );

    if (res.data.success) {
      alert("Welcome Back! " + res.data.cust1.name);
      dispatch(addUser(res.data.cust1));
      navigate("/feed");
    } else {
      alert("Invalid Credentials"); // ❌ show error
    }

  } catch (err) {
    alert("Login failed");
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
              <input
                type="text"
                value={email}
                className="input"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password : {password}</legend>
              <input
                type="text"
                value={password}
                className="input"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="flex justify-between">
            <button className="btn btn-primary my-5" onClick={handleLogin}>
              Login
            </button>
            <button className="btn btn-success my-5"><Link to="/signup">New User?</Link></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
