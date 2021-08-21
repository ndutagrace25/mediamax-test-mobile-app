import {ADD_TODO, FETCH_TODOS, UPDATE_STATUS} from '../actions/types';

const initialState = {
  allTodos: [],
  addResponse: {},
  updateResponse: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_TODOS:
      return {
        ...state,
        allTodos: action.payload,
      };
    case ADD_TODO:
      return {
        ...state,
        addResponse: action.payload,
      };
    case UPDATE_STATUS:
      return {
        ...state,
        updateResponse: action.payload,
      };
    default:
      return state;
  }
}
