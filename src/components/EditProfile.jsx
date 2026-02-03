import React, { useState } from "react";
import Usercard from "./Usercard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills);
  const [email, setEmail] = useState(user.email);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [notif,setNotif] = useState("");

  const handleSaveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          name,
          age,
          photoUrl,
          gender,
          about,
          skills,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
      setNotif(res?.data?.message)
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data.message);
      console.log(err.message);
    }
  };
  return (
    //EDIT FORM (SIMILIAR AS SIGNUP)
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10 mb-20">
          <div className="card card-border bg-base-300 w-96">
            <div className="card-body">
              <h2 className="card-title">Edit Profile</h2>

              {/* {error && <p className="text-red-500 mb-2">{error}</p>} */}

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Name</legend>
                <input
                  type="text"
                  value={name}
                  className="input"
                  onChange={(e) => setName(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="text"
                  value={age}
                  className="input"
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">PhotoUrl</legend>
                <input
                  type="text"
                  value={photoUrl}
                  className="input"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>
                <input
                  type="text"
                  value={gender}
                  className="input"
                  onChange={(e) => setGender(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <input
                  type="text"
                  value={about}
                  className="input"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Skills</legend>
                <input
                  type="text"
                  value={skills}
                  className="input"
                  onChange={(e) => setSkills(e.target.value)}
                />
              </fieldset>
              <p className="text text-red-500">{error}</p>
              <div className="flex justify-center">
                <button
                  className="btn btn-primary my-5"
                  onClick={handleSaveProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <Usercard
          user={{ name, age, photoUrl, gender, about, skills, email }}
        />
      </div>
      {showToast && (
      <div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>{notif}</span>
  </div>
</div>
      )}  
    </>
  );
};

export default EditProfile;
