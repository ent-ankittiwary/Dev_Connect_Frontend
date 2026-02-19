// import React, { useEffect } from 'react'
// import { BASE_URL } from '../utils/constants'
// import { useDispatch, useSelector } from 'react-redux'
// import { AddReview } from '../utils/reviewSlice';

// const Review = ({toUserId}) => {

//     const dispatch = useDispatch();
//     const reviews = useSelector((store)=>store.reviews);


//     const getReviews =async()=>{
//         try{
//             const review = await axios.get(BASE_URL+"/review"+toUserId,{withCredentials:true});
//             if(review.length===0){
//                 return <p>No review exist</p>
//             }
//             dispatch(AddReview(review));

//         }
//         catch(err){
//             res.send(err);
//         }
//     }


//     useEffect(()=>{
//         getReviews()
//     },[])



//   return (
//     <div>
//         <div className="chat chat-start">
//   <div className="chat-image avatar">
//     <div className="w-10 rounded-full">
//       <img
//         alt="Tailwind CSS chat bubble component"
//         src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
//       />
//     </div>
//   </div>
//   <div className="chat-header">
//     Obi-Wan Kenobi
//     <time className="text-xs opacity-50">12:45</time>
//   </div>
//   <div className="chat-bubble">You were the Chosen One!</div>
//   <div className="chat-footer opacity-50">Delivered</div>
// </div>
// <div className="chat chat-end">
//   <div className="chat-image avatar">
//     <div className="w-10 rounded-full">
//       <img
//         alt="Tailwind CSS chat bubble component"
//         src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
//       />
//     </div>
//   </div>
//   <div className="chat-header">
//     Anakin
//     <time className="text-xs opacity-50">12:46</time>
//   </div>
//   <div className="chat-bubble">I hate you!</div>
//   <div className="chat-footer opacity-50">Seen at 12:46</div>
// </div>
//     </div>
//   )
// }

// export default Review




import React, { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addReview} from '../utils/reviewSlice';

const Review = ({ toUserId }) => {

    const dispatch = useDispatch();

    // assuming your slice stores array directly
    const reviews = useSelector((store) => store.review);

    const getReviews = async () => {
        try {
            if(!toUserId){
                return ;
            }
            const response = await axios.get(
                BASE_URL+"/review/"+toUserId,
                { withCredentials: true }
            );
            dispatch(addReview(response.data.data));

        } catch (err) {
            console.log(err.message);
        }
    }

      useEffect(() => {
        getReviews();
    }, [toUserId]);

  

    return (
        <div>
            {reviews.length === 0 && (
                <p className="text-center mt-4">No reviews exist</p>
            )}

            {reviews.map((r) => {
                return (
                <div key={r._id} className="chat chat-start">

                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="profile"
                                src={r?.fromUserId?.photoUrl || "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"}
                            />
                        </div>
                    </div>

                    <div className="chat-header">
                        {r?.fromUserId?.name}
                        <time className="text-xs opacity-50 ml-2">
                            {new Date(r?.createdAt).toLocaleDateString()}
                        </time>
                    </div>

                    <div className="chat-bubble">
                        {r?.comment}
                    </div>

                    <div className="chat-footer opacity-50">
                        ⭐ {r?.rating}
                    </div>

                </div>
)})}

        </div>
    )
}

export default Review;
