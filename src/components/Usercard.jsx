import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUserFromFeed } from "../utils/feedSlice";

const Usercard = ({ user }) => {
  const dispatch = useDispatch();
  console.log(user);
  const { _id, name, age, photoUrl, gender, about, skills } = user;


  const HandleSendRequest = async (status, _id) => {
    //id is Feed UserId
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(_id)); //This will Remove the UserCard from feed  and put it to incoming request where currrenet user Id become toUserId and our loggedin user become fromUserId
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img src={photoUrl} alt="UserImg" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{user?.email}</p>
          {age && gender && <p>{age + "," + gender}</p>}
          {about && <p>{user?.about}</p>}
          {skills && (
            <p>
              <b>Skills: </b>
              {skills + " "}
            </p>
          )}
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary text-white"
              onClick={() => HandleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-primary bg-green-800 text-white"
              onClick={() => HandleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usercard;
