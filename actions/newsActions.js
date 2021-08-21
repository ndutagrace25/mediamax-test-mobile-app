let API_KEY = `860d979182534ded88fdab6cc8f469eb`;
import {FETCH_NEWS} from './types';
import axios from 'axios';

let url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`;

export const fetchNews = () => dispatch => {
  // fetch the news from the api
  axios
    .get(url)
    .then(response => {
      dispatch({
        type: FETCH_NEWS,
        payload: response.data.articles,
      });
    })
    .catch(error => console.log(error));
};
