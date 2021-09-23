import React from "react";
import { SORT_DATE, SORT_HIGH, SORT_LOW } from "../constants";

export const Sorter = ({ isMobile, sortType, onClick }) => (
  <section className="sort-container">
    <h3 className="sort-header">{isMobile ? "Sort:" : "Sort by:"}</h3>
    <div
      className={`sort-option ${sortType === SORT_DATE ? "text-bold" : null}`}
      onClick={() => onClick(SORT_DATE)}
    >
      {isMobile ? "Recent" : "Most Recent"}
    </div>
    <div
      className={`sort-option ${sortType === SORT_HIGH ? "text-bold" : null}`}
      onClick={() => onClick(SORT_HIGH)}
    >
      {isMobile ? "Highest" : "Rating: High to Low"}
    </div>
    <div
      className={`sort-option ${sortType === SORT_LOW ? "text-bold" : null}`}
      onClick={() => onClick(SORT_LOW)}
    >
      {isMobile ? "Lowest" : "Rating: Low to High"}
    </div>
  </section>
);
