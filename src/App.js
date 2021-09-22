import profileImage from "./shakespeare.jpeg";
import "./App.css";
import { useEffect, useState } from "react";

const getRatingType = (rating) => {
  if (rating < 40) {
    return "poor";
  }

  if (rating < 70) {
    return "mixed";
  }

  return "positive";
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);

  useEffect(() => {
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

  const filterReviews = (ratingType) => {
    if (!ratingType) {
      setFilteredReviews(reviews);
    } else {
      const newReviews = reviews.filter(
        (review) => getRatingType(review.rating * 20) === ratingType
      );

      setFilteredReviews(newReviews);
    }
  };

  const ratingInfo = reviews.length
    ? reviews.reduce(
        ({ total, ...rest }, { rating }) => {
          const normalizedRating = rating * 20;
          const ratingType = getRatingType(normalizedRating);

          return {
            total: total + normalizedRating,
            ...rest,
            [ratingType]: rest[ratingType] + 1,
          };
        },
        { total: 0, poor: 0, mixed: 0, positive: 0 }
      )
    : null;

  const { total = 0, ...ratings } = ratingInfo || {};
  const averageRating = Math.round(total / reviews.length);
  const maxRatingCount = Math.max(...Object.values(ratings));
  const filterActive = reviews.length !== filteredReviews.length;

  // Add a sort (date, high to low, low to high)

  return (
    <div className="app">
      <header className="app-header">
        <h1>Review the Bard</h1>
      </header>
      <main className="main-content">
        <h1>Ratings</h1>
        {!isLoading && (
          <section className="reviews-summary-container">
            <div className="profile">
              <img
                className="profile-picture"
                src={profileImage}
                alt="shakespeare"
              />
              <div>
                <h3 className="profile-title">William Shakespeare</h3>
                <p>
                  <span className="text-bold">Born:</span> April 26, 1564
                </p>
                <p>
                  <span className="text-bold">Location:</span>{" "}
                  Stratford-upon-Avon
                </p>
                <p>
                  <span className="text-bold">Genres:</span> Histories,
                  Comedies, Tragedies
                </p>
              </div>
            </div>
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
                {ratingInfo && ratingInfo.positive && (
                  <div>
                    <div
                      className="review-type"
                      onClick={() => filterReviews("positive")}
                    >
                      <span className="text-bold">Positive:</span>{" "}
                      <span>
                        {Math.round(
                          (ratingInfo.positive / reviews.length) * 100
                        )}{" "}
                        %
                      </span>
                      <div className="chart">
                        <div className="chart-background" />
                        <div
                          className="chart-progress background-positive"
                          style={{
                            width: `${
                              (ratingInfo.positive / maxRatingCount) * 100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                    <div
                      className="review-type"
                      onClick={() => filterReviews("mixed")}
                    >
                      <span className="text-bold">Mixed:</span>{" "}
                      <span>
                        {Math.round((ratingInfo.mixed / reviews.length) * 100)}{" "}
                        %
                      </span>
                      <div className="chart">
                        <div className="chart-background" />
                        <div
                          className="chart-progress background-mixed"
                          style={{
                            width: `${
                              (ratingInfo.mixed / maxRatingCount) * 100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                    <div
                      className="review-type"
                      onClick={() => filterReviews("poor")}
                    >
                      <span className="text-bold">Poor:</span>{" "}
                      <span>
                        {Math.round((ratingInfo.poor / reviews.length) * 100)} %
                      </span>
                      <div className="chart">
                        <div className="chart-background" />
                        <div
                          className="chart-progress background-poor"
                          style={{
                            width: `${
                              (ratingInfo.poor / maxRatingCount) * 100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button
                className={`remove-filter-button ${
                  filterActive ? "active" : ""
                }`}
                onClick={() => filterReviews()}
              >
                <span className="x-icon">×</span>{" "}
                <span className="remove-filter-button-text">Remove filter</span>
              </button>
            </div>
          </section>
        )}

        {!isLoading && (
          <section className="reviews-grid">
            {filteredReviews.map((review) => {
              // Ratings can range from 0.0 - 5.0, multiply by 20 to get the score on a scale of 0 - 100
              const normalizedRating = review.rating * 20;
              const reviewDate = new Date(review.publish_date);

              return (
                <div key={review.id} className="review">
                  <div className="review-heading">
                    <span
                      className={`review-rating background-${getRatingType(
                        normalizedRating
                      )}`}
                    >
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
            })}
          </section>
        )}
      </main>
    </div>
  );
};

export default App;
