import { RATING_MIXED, RATING_POOR, RATING_POSITIVE } from "../constants";
import * as utils from "../utils";

describe("utils", () => {
  describe("getRatingType", () => {
    test("returns poor for ratings below 40", () => {
      expect(utils.getRatingType(0)).toEqual(RATING_POOR);
      expect(utils.getRatingType(20)).toEqual(RATING_POOR);
      expect(utils.getRatingType(39)).toEqual(RATING_POOR);
    });

    test("returns mixed for ratings between 40 and 70", () => {
      expect(utils.getRatingType(40)).toEqual(RATING_MIXED);
      expect(utils.getRatingType(60)).toEqual(RATING_MIXED);
      expect(utils.getRatingType(69)).toEqual(RATING_MIXED);
    });

    test("returns positive for ratings over 70", () => {
      expect(utils.getRatingType(70)).toEqual(RATING_POSITIVE);
      expect(utils.getRatingType(90)).toEqual(RATING_POSITIVE);
      expect(utils.getRatingType(100)).toEqual(RATING_POSITIVE);
    });
  });

  describe("getReviewsData", () => {
    test("returns the proper data", () => {
      const reviews = [
        { rating: 0.1 },
        { rating: 5.0 },
        { rating: 2.5 },
        { rating: 1.2 },
        { rating: 4.8 },
        { rating: 4.2 },
      ];
      const result = utils.getReviewsData(reviews);

      expect(result.total).toEqual(356);
      expect(result[RATING_POOR]).toEqual(2);
      expect(result[RATING_MIXED]).toEqual(1);
      expect(result[RATING_POSITIVE]).toEqual(3);
    });

    test("returns the proper data when reviews is empty", () => {
      const result = utils.getReviewsData([]);

      expect(result.total).toEqual(0);
      expect(result[RATING_POOR]).toEqual(0);
      expect(result[RATING_MIXED]).toEqual(0);
      expect(result[RATING_POSITIVE]).toEqual(0);
    });
  });
});
