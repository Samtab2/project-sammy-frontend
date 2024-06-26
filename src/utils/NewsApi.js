import { APIKey, parseCurrentDate, parsePreviousWeek } from "./constants";


export const getSearchResults = (keyWord) => {
   if (!keyWord) {
    return Promise.reject(`Error: ${keyWord}`);
  }
  const processServerResponse = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  };

  return fetch(
    `https://newsapi.org/v2/everything?q=${keyWord}&from=${parsePreviousWeek}&to=${parseCurrentDate}&sortBy=popularity&apiKey=${APIKey}`
  ).then(processServerResponse);
};
