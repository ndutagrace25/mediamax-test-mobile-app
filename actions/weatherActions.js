let API_KEY = `d40584865913ae9b140ce06d001ef346`;
import {FETCH_WEATHER} from './types';
import axios from 'axios';

let url = `https://api.openweathermap.org/data/2.5/forecast?q=Nairobi&appid=${API_KEY}`;

export const fetchWeather = () => dispatch => {
  // fetch the weather from the api
  axios
    .get(url)
    .then(response => {
      dispatch({
        type: FETCH_WEATHER,
        payload: response.data.list,
      });
    })
    .catch(error => console.log(error));
};
