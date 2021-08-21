import {FETCH_NEWS} from '../actions/types';

const initialState = {
  newsData: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_NEWS:
      return {
        ...state,
        newsData: action.payload,
      };
    default:
      return state;
  }
}
