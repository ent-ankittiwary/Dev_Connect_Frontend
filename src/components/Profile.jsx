import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const Profile=()=>{
    const navigate = useNavigate();
      const userData = useSelector((store) => store.user);

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
  }, [userData, navigate]);
    return(
        <div>
            <p>THis is profile page</p>
        </div>
    )
}

export default Profile;