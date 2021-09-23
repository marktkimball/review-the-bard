import React from "react";
import { getRatingType } from "../utils";

export const Review = ({ review }) => {
  // Ratings can range from 0.0 - 5.0, multiply by 20 to get the score on a scale of 0 - 100
  const normalizedRating = review.rating * 20;
  const reviewDate = new Date(review.publish_date);
  const ratingLevel = getRatingType(normalizedRating);

  return (
    <div className="review">
      <div className="review-heading">
        <span className={`review-rating background-${ratingLevel}`}>
          {normalizedRating}
        </span>
        <div className="review-metadata">
          <div className="review-author">{review.author}</div>
          <div>
            {reviewDate.toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
      <p className="review-text">"{review.body}"</p>
    </div>
  );
};
