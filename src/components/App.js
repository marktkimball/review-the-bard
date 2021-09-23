import React, { useEffect, useState } from "react";
import { Review } from "./Review";
import { SkeletonReview } from "./SkeletonReview";
import { ReviewChart } from "./ReviewChart";
import { Profile } from "./Profile";
import { Sorter } from "./Sorter";
import {
  RATING_MIXED,
  RATING_POOR,
  RATING_POSITIVE,
  SORT_DATE,
  SORT_HIGH,
  SORT_LOW,
} from "../constants";
import { getRatingType, getReviewsData } from "../utils";
import "../App.css";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [sortType, setSortType] = useState(SORT_DATE);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if body is "mobile" size
    const body = document.body;
    const bodyContentType = window
      .getComputedStyle(body, ":before")
      .getPropertyValue("content")
      .replace(/"/g, "");
    if (bodyContentType === "mobile") {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }

    // Fetch the reviews
    async function fetchReviews() {
      const response = await fetch(
        "https://shakespeare.podium.com/api/reviews",
        {
          headers: {
            "x-api-key": "H3TM28wjL8R4#HTnqk?c",
          },
        }
      );

      const reviews = await response.json();
      setReviews(reviews);
      setFilteredReviews(reviews);
      setIsLoading(false);
    }

    fetchReviews();
  }, []);

  const sortReviews = (sortType, maybeReviews) => {
    setSortType(sortType);

    return (maybeReviews || filteredReviews).sort((a, b) => {
      if (sortType === SORT_DATE) {
        return (
          new Date(b.publish_date).getTime() -
          new Date(a.publish_date).getTime()
        );
      }

      if (sortType === SORT_HIGH) {
        return b.rating - a.rating;
      }

      if (sortType === SORT_LOW) {
        return a.rating - b.rating;
      }

      return 0;
    });
  };

  const filterReviews = (ratingType) => {
    if (!ratingType) {
      const newReviews = sortReviews(sortType, reviews);
      setFilteredReviews(newReviews);
    } else {
      const newReviews = reviews.filter(
        (review) => getRatingType(review.rating * 20) === ratingType
      );

      const sortedNewReviews = sortReviews(sortType, newReviews);
      setFilteredReviews(sortedNewReviews);
    }
  };

  // Using the original reviews array because we don't want the overall info to change when reviews get filtered
  const ratingInfo = reviews.length ? getReviewsData(reviews) : null;

  const { total = 0, ...ratings } = ratingInfo || {};
  const averageRating = Math.round(total / reviews.length);
  const maxRatingCount = Math.max(...Object.values(ratings));
  const filterActive = reviews.length !== filteredReviews.length;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Review the Bard</h1>
      </header>
      <main className="main-content">
        <section className="reviews-summary-container">
          <Profile />
          {!isLoading && (
            <div>
              <div className="reviews-summary">
                <div>
                  <div
                    className={`review-rating average-rating background-${getRatingType(
                      averageRating
                    )}`}
                  >
                    {averageRating}
                  </div>
                </div>
                {ratingInfo && ratingInfo[RATING_POSITIVE] && (
                  <div>
                    <ReviewChart
                      maxRatingCount={maxRatingCount}
                      onClick={() => filterReviews(RATING_POSITIVE)}
                      ratingType={RATING_POSITIVE}
                      ratingsCount={ratingInfo[RATING_POSITIVE]}
                      reviewsLength={reviews.length}
                    />
                    <ReviewChart
                      maxRatingCount={maxRatingCount}
                      onClick={() => filterReviews(RATING_MIXED)}
                      ratingType={RATING_MIXED}
                      ratingsCount={ratingInfo[RATING_MIXED]}
                      reviewsLength={reviews.length}
                    />
                    <ReviewChart
                      maxRatingCount={maxRatingCount}
                      onClick={() => filterReviews(RATING_POOR)}
                      ratingType={RATING_POOR}
                      ratingsCount={ratingInfo[RATING_POOR]}
                      reviewsLength={reviews.length}
                    />
                    <button
                      className={`remove-filter-button ${
                        filterActive ? "active" : ""
                      }`}
                      onClick={() => filterReviews()}
                    >
                      <span className="x-icon">×</span>{" "}
                      <span className="remove-filter-button-text">
                        Remove filter
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        <Sorter isMobile={isMobile} sortType={sortType} onClick={sortReviews} />
        <section className="reviews-grid">
          {isLoading
            ? [...new Array(24).fill(0)].map((_, i) => (
                <SkeletonReview key={i} />
              ))
            : filteredReviews.map((review) => (
                <Review key={review.id} review={review} />
              ))}
        </section>
      </main>
    </div>
  );
};

export default App;
