import {combineReducers} from 'redux';
import todoReducer from './todoReducer';
import newsReducer from './newsReducer';
import weatherReducer from './weatherReducer';

export default combineReducers({
  todo: todoReducer,
  news: newsReducer,
  weather: weatherReducer
});
