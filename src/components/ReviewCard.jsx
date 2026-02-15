import React from "react";
import StarRating from "./StarRating";

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-base-200 p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{review.fromUserId.name}</h3>
        <StarRating rating={review.rating} />
      </div>

      <p className="mt-2 text-sm text-gray-600">
        {review.comment}
      </p>

      <p className="text-xs mt-1 text-gray-400">
        {new Date(review.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ReviewCard;
