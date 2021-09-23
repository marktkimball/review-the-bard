import React from "react";

export const SkeletonReview = () => (
  <div className="review">
    <div className="review-heading">
      <div className="review-rating background-skeleton" />
      <div className="review-metadata">
        <div className="review-skeleton-text" />
        <div className="review-skeleton-text review-skeleton-text-alt" />
      </div>
    </div>
    <div className="review-skeleton-text" />
  </div>
);
