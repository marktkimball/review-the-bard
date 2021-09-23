import React from "react";

export const ReviewChart = ({
  maxRatingCount,
  onClick,
  ratingType,
  ratingsCount,
  reviewsLength,
}) => (
  <div className="review-type" onClick={onClick}>
    <span className="text-bold">
      {`${ratingType.charAt(0).toUpperCase()}${ratingType.slice(1)}`}:
    </span>{" "}
    <span>{Math.round((ratingsCount / reviewsLength) * 100)} %</span>
    <div className="chart">
      <div className="chart-background" />
      <div
        className={`chart-progress background-${ratingType}`}
        style={{
          width: `${(ratingsCount / maxRatingCount) * 100}%`,
        }}
      />
    </div>
  </div>
);
