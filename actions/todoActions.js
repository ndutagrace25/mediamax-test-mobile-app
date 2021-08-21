import {FETCH_TODOS, ADD_TODO, UPDATE_STATUS} from './types';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';

let url = `http://169.239.171.26/todo`;

export const fetchTodos = () => dispatch => {
  // fetch the todos from the api
  axios
    .get(url)
    .then(response => {
      dispatch({
        type: FETCH_TODOS,
        payload: response.data,
      });
    })
    .catch(error => console.log(error));
};

// add a todo
export const addTodo = todoDetails => dispatch => {
  // fetch the todos from the api
  axios
    .post(url, todoDetails)
    .then(response => {
      dispatch({
        type: ADD_TODO,
        payload: response.data,
      });
      //   show a success mesaage
      showMessage({
        message: 'Success',
        description: 'Task added!!',
        type: 'success',
        icon: 'success',
        duration: 5000,
      });
    })
    .catch(error => {
      showMessage({
        message: 'Error',
        description: 'Oop!! something went wrong try again',
        type: 'error',
        icon: 'error',
        duration: 5000,
      });
    });
};

// update a todo
export const updateStatusTodo = todoDetails => dispatch => {
  // fetch the todos from the api
  axios
    .patch(url, todoDetails)
    .then(response => {
      dispatch({
        type: UPDATE_STATUS,
        payload: response.data,
      });
      //   show a success mesaage
      showMessage({
        message: 'Success',
        description: 'Status Updated!!',
        type: 'success',
        icon: 'success',
        duration: 5000,
      });
    })
    .catch(error => {
      showMessage({
        message: 'Error',
        description: 'Oop!! something went wrong try again',
        type: 'error',
        icon: 'error',
        duration: 5000,
      });
    });
};
