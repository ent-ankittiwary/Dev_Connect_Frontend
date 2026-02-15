import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";
import { addConnections } from "../utils/connectionSlice";

const Request = () => {
  const request = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequests(_id));
      alert(res.data.message);
      //trial
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL+"/interested/connections", {
        withCredentials: true,
      });
      console.log(res);
      if (res.data.data.length != 0) {
        dispatch(addRequests(res.data.data));
      }
        if (!request || request.length === 0) {
    return <h1>No Connection Request found</h1>;
  }
    } catch (err) {
      // if (err.status === 404) {
      alert("You have no connection Requests for now!");
      console.log("No users have sent you a connection request");
      // }
      console.log(err.message);
    }
  };
  // if (!request) {
  //   return <h1>No Connection Request Found</h1>;
  // }
  // if (request.length <= 0) {
  //   return <h1>No Connection Request found</h1>;
  // }

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="text-center my-10 px-2">
      <h1 className="text-bold text-2xl mb-6">Incoming Request</h1>

      {request &&
        request.map((r) => {
          const { name, age, photoUrl, gender, about, skills } = r.fromUserId;

          return (
            <div
              key={r._id}
              className="
              bg-base-200 rounded-lg p-4 mb-6
              w-full sm:w-11/12 md:w-3/4 lg:w-1/2
              mx-auto
            "
            >
              {/* Main content */}
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                {/* Avatar */}
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  <img
                    className="w-20 h-20 rounded-full"
                    alt="User-Img"
                    src={photoUrl}
                  />
                </div>

                {/* User info */}
                <div className="text-left flex-1">
                  <h2 className="font-bold text-xl">{name}</h2>

                  {age && gender && (
                    <p className="font-medium text-sm">
                      {age}, {gender}
                    </p>
                  )}

                  <p className="font-normal mt-1">{about}</p>
                  <p className="font-light text-sm mt-1">{skills + ""}</p>
                </div>

                {/* Action buttons */}
                <div
                  className="
                flex flex-col md:flex-row
                gap-3
                justify-center
                w-full md:w-auto
              "
                >
                  <button
                    className="btn btn-sm md:btn-md bg-red-700 text-white"
                    onClick={() => {
                      reviewRequest("rejected", r._id);
                    }}
                  >
                    Reject
                  </button>

                  <button
                    className="btn btn-sm md:btn-md bg-green-700 text-white"
                    onClick={() => {
                      reviewRequest("accepted", r._id);
                    }}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default Request;


// import axios from "axios";
// import React, { useEffect } from "react";
// import { BASE_URL } from "../utils/constants";
// import { useDispatch, useSelector } from "react-redux";
// import { addRequests, removeRequests } from "../utils/requestSlice";

// const Request = () => {
//   const request = useSelector((store) => store.requests);
//   const dispatch = useDispatch();

//   const reviewRequest = async (status, _id) => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/request/review/" + status + "/" + _id,
//         {},
//         { withCredentials: true }
//       );
//       dispatch(removeRequests(_id));
//       alert(res.data.message);
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   const fetchRequests = async () => {
//     try {
//       const res = await axios.get(
//         BASE_URL + "/interested/connections",
//         { withCredentials: true }
//       );

//       if (res.data?.data?.length > 0) {
//         dispatch(addRequests(res.data.data));
//       }
//     } catch (err) {
//       if (err.response?.status === 404) {
//         alert("You have no connection Requests for now!");
//         console.log("No users have sent you a connection request");
//       } else {
//         alert("Something went wrong. Please try again.");
//       }
//       console.log(err.message);
//     }
//   };

//   if (!request || request.length === 0) {
//     return <h1>No Connection Request Found</h1>;
//   }

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   return (
//     <div className="text-center my-10 px-2">
//       <h1 className="text-bold text-2xl mb-6">Incoming Request</h1>

//       {request &&
//         request.map((r) => {
//           const { name, age, photoUrl, gender, about, skills } = r.fromUserId;

//           return (
//             <div
//               key={r._id}
//               className="
//                 bg-base-200 rounded-lg p-4 mb-6
//                 w-full sm:w-11/12 md:w-3/4 lg:w-1/2
//                 mx-auto
//               "
//             >
//               <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
//                 <div className="flex-shrink-0 mx-auto md:mx-0">
//                   <img
//                     className="w-20 h-20 rounded-full"
//                     alt="User-Img"
//                     src={photoUrl}
//                   />
//                 </div>

//                 <div className="text-left flex-1">
//                   <h2 className="font-bold text-xl">{name}</h2>

//                   {age && gender && (
//                     <p className="font-medium text-sm">
//                       {age}, {gender}
//                     </p>
//                   )}

//                   <p className="font-normal mt-1">{about}</p>

//                   <p className="font-light text-sm mt-1">
//                     {Array.isArray(skills) ? skills.join(", ") : skills}
//                   </p>
//                 </div>

//                 <div
//                   className="
//                     flex flex-col md:flex-row
//                     gap-3
//                     justify-center
//                     w-full md:w-auto
//                   "
//                 >
//                   <button
//                     className="btn btn-sm md:btn-md bg-red-700 text-white"
//                     onClick={() => reviewRequest("rejected", r._id)}
//                   >
//                     Reject
//                   </button>

//                   <button
//                     className="btn btn-sm md:btn-md bg-green-700 text-white"
//                     onClick={() => reviewRequest("accepted", r._id)}
//                   >
//                     Accept
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//     </div>
//   );
// };

// export default Request;



// import axios from "axios";
// import React, { useEffect } from "react";
// import { BASE_URL } from "../utils/constants";
// import { useDispatch, useSelector } from "react-redux";
// import { addRequests, removeRequests } from "../utils/requestSlice";

// const Request = () => {
//   const request = useSelector((store) => store.requests);
//   const dispatch = useDispatch();

//   const reviewRequest = async (status, _id) => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/request/review/" + status + "/" + _id,
//         {},
//         { withCredentials: true }
//       );
//       dispatch(removeRequests(_id));
//       alert(res.data.message);
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   const fetchRequests = async () => {
//     console.log("🔥 fetchRequests CALLED");

//     try {
//       const res = await axios.get(
//         BASE_URL + "/interested/connections", // ✅ FIXED URL
//         { withCredentials: true }
//       );

//       console.log("✅ API RESPONSE:", res.data);

//       if (res.data?.data?.length > 0) {
//         dispatch(addRequests(res.data.data));
//       }
//         if (!request || request.length === 0) {
//     return <h1>No Connection Request found</h1>;
//   }
//     } catch (err) {
//       if (err.response?.status === 404) {
//         alert("You have no connection Requests for now!");
//         console.log("No users have sent you a connection request");
//       } else {
//         alert("Something went wrong!");
//       }
//       console.log(err.message);
//     }
//   };

//   // if (!request || request.length === 0) {
//   //   return <h1>No Connection Request found</h1>;
//   // }

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   return (
//     <div className="text-center my-10 px-2">
//       <h1 className="text-bold text-2xl mb-6">Incoming Request</h1>

//       {request &&
//         request.map((r) => {
//           const { name, age, photoUrl, gender, about, skills } = r.fromUserId;

//           return (
//             <div
//               key={r._id}
//               className="
//                 bg-base-200 rounded-lg p-4 mb-6
//                 w-full sm:w-11/12 md:w-3/4 lg:w-1/2
//                 mx-auto
//               "
//             >
//               <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
//                 <div className="flex-shrink-0 mx-auto md:mx-0">
//                   <img
//                     className="w-20 h-20 rounded-full"
//                     alt="User-Img"
//                     src={photoUrl}
//                   />
//                 </div>

//                 <div className="text-left flex-1">
//                   <h2 className="font-bold text-xl">{name}</h2>

//                   {age && gender && (
//                     <p className="font-medium text-sm">
//                       {age}, {gender}
//                     </p>
//                   )}

//                   <p className="font-normal mt-1">{about}</p>
//                   <p className="font-light text-sm mt-1">
//                     {Array.isArray(skills) ? skills.join(", ") : skills}
//                   </p>
//                 </div>

//                 <div
//                   className="
//                     flex flex-col md:flex-row
//                     gap-3
//                     justify-center
//                     w-full md:w-auto
//                   "
//                 >
//                   <button
//                     className="btn btn-sm md:btn-md bg-red-700 text-white"
//                     onClick={() => reviewRequest("rejected", r._id)}
//                   >
//                     Reject
//                   </button>

//                   <button
//                     className="btn btn-sm md:btn-md bg-green-700 text-white"
//                     onClick={() => reviewRequest("accepted", r._id)}
//                   >
//                     Accept
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//     </div>
//   );
// };

// export default Request;
