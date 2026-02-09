// import axios from "axios";
// import React, { useEffect } from "react";
// import { BASE_URL } from "../utils/constants";
// import { addConnections } from "../utils/connectionSlice";
// import { useDispatch, useSelector } from "react-redux";

// const Connection = () => {
//   const dispatch = useDispatch();
//   const connections = useSelector((store) => store.connections);
//   const user = useSelector((store) => store.user);
//   console.log(connections);
//   const fetchConnections = async () => {
//     try {
//       const res = await axios.get(BASE_URL + "/accepted/connections", {
//         withCredentials: true,
//       });
//       console.log(res?.data?.data);
//       dispatch(addConnections(res?.data?.data));
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   useEffect(() => {
//     fetchConnections();
//   }, []);

// //   if (!connections) {
// //     return ;
// //   }
//   if (connections.length<=0) {
//     return <h1>No Connections found</h1>;
//   }
//   if (!Array.isArray(connections)) return null;
// // console.log("isArray =", Array.isArray(connections));


//   return (
//     <div className="text-center my-10">
//       <h1 className="text-bold text-2xl">My Connections</h1>

//       {connections &&
//         user &&
//         connections.map((connection) => {
//             console.log(connection);
//           const fromId = String(connection.fromUserId._id);
//           const loggedInId = String(user._id);
//           const toId = String(connection.toUserId._id);

//           let otherUser = null;

//           if (fromId === loggedInId) {
//             otherUser = connection.toUserId;
//           } else if (toId === loggedInId) {
//             otherUser = connection.fromUserId;
//           } else {
//             return null; // safety guard
//           }

//           const { name, age, photoUrl, gender, about, skills } = otherUser;
//           return (
//             <div
//               key={connection._id}
//               className=" flex gap-4 m-4 p-4 rounded-lg bg-base-200 w-1/2 mx-auto"
//             >
//               <div className="my-1">
//                 <img
//                   className="w-20 h-20 rounded-full"
//                   alt="User-Img"
//                   src={photoUrl}
//                 />
//               </div>
//               <div className="text-left mx-4">
//                 <h2 className="font-bold text-xl">{name}</h2>
//                 {age && gender && (
//                   <p className="font-medium text-shadow-white">
//                     {age + "," + gender}
//                   </p>
//                 )}
//                 <p className="font-normal">{about}</p>
//                 <p className="font-light">{skills + ""}</p>
//               </div>
//             </div>
//           );
//         })}
//     </div>
//   );
// };

// export default Connection;





import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionSlice";
import { useDispatch, useSelector } from "react-redux";

const Connection = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const user = useSelector((store) => store.user);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/accepted/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  // ✅ FIRST: must be array
  if (!Array.isArray(connections)) return null;

  // ✅ empty state
  if (connections.length === 0) {
    return <h1>No Connections found</h1>;
  }

  // ✅ wait for user
  if (!user) return null;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-2xl">My Connections</h1>

      {connections.map((connection) => {
        // 🚨 GUARD: skip broken records
        if (!connection.fromUserId || !connection.toUserId) {
          console.warn("Skipping invalid connection:", connection);
          return null;
        }

        const fromId = String(connection.fromUserId._id);
        const toId = String(connection.toUserId._id);
        const loggedInId = String(user._id);

        let otherUser = null;

        if (fromId === loggedInId) {
          otherUser = connection.toUserId;
        } else if (toId === loggedInId) {
          otherUser = connection.fromUserId;
        } else {
          return null;
        }

        // ✅ FINAL SAFETY
        if (!otherUser) return null;

        const { name, age, photoUrl, gender, about, skills } = otherUser;

        return (
          <div
            key={connection._id}
            className="flex gap-4 m-4 p-4 rounded-lg bg-base-200 w-1/2 mx-auto"
          >
            <div className="my-1">
              <img
                className="w-20 h-20 rounded-full"
                alt="User-Img"
                src={photoUrl}
              />
            </div>

            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">{name}</h2>
              {age && gender && (
                <p className="font-medium">
                  {age}, {gender}
                </p>
              )}
              <p className="font-normal">{about}</p>
              <p className="font-light">{skills + ""}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connection;
