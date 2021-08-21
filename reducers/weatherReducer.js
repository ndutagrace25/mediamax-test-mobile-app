import {FETCH_WEATHER} from '../actions/types';

const initialState = {
  weatherData: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_WEATHER:
      return {
        ...state,
        weatherData: action.payload,
      };
    default:
      return state;
  }
}
