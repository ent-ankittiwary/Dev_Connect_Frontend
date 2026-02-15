import React, { useEffect, useState } from "react";
import axios from "axios";
import StarRating from "./StarRating";
import ReviewCard from "./ReviewCard";
import { BASE_URL } from "../utils/constants";

const ReviewSection = ({ feedReview }) => {
    // console.log(feedReview);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  // Fetch Reviews
  const fetchReviews = async () => {
    const res = await axios.get(BASE_URL+"/review/"+feedReview, {
      withCredentials: true,
    });
    setReviews(res.data.data);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Submit Review
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      `${BASE_URL}/review/${userId}`,
      { comment, rating },
      { withCredentials: true }
    );

    setComment("");
    setRating(0);
    fetchReviews();
  };

  return (
    <div className="mt-6">

      <h2 className="text-xl font-bold mb-4">Reviews</h2>

      {/* Add Review */}
      <form onSubmit={handleSubmit} className="mb-6">
        <StarRating rating={rating} setRating={setRating} />

        <textarea
          className="w-full mt-2 p-2 border rounded-lg"
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          type="submit"
          className="btn btn-primary mt-2"
        >
          Submit Review
        </button>
      </form>

      {/* Review List */}
      <div className="flex flex-col gap-4">
        {reviews.length === 0 ? (
          <p>No reviews yet</p>
        ) : (
          reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
