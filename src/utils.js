import { RATING_POOR, RATING_MIXED, RATING_POSITIVE } from "./constants";

export const getRatingType = (rating) => {
  if (rating < 40) {
    return RATING_POOR;
  }

  if (rating < 70) {
    return RATING_MIXED;
  }

  return RATING_POSITIVE;
};

export const getReviewsData = (reviews = []) =>
  reviews.reduce(
    ({ total, ...rest }, { rating }) => {
      const normalizedRating = rating * 20;
      const ratingType = getRatingType(normalizedRating);

      return {
        total: total + normalizedRating,
        ...rest,
        [ratingType]: rest[ratingType] + 1,
      };
    },
    { total: 0, [RATING_POOR]: 0, [RATING_MIXED]: 0, [RATING_POSITIVE]: 0 }
  );
