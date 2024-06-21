import { APIKey, parseCurrentDate, parsePreviousWeek } from "./constants";

export const getSearchResults = (keyword) => {
  return fetch(
    `https://newsapi.org/v2/everything?q=${keyword}&from=${parsePreviousWeek}&to=${parseCurrentDate}&sortBy=popularity&apiKey=${APIKey}`
  ).then((response) => response.json());
};
