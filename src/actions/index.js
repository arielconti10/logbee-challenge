
import { tasksRef , authRef } from "../config/firebase";
import { FETCH_TASKS, FETCH_USER } from "./types";
export const TASK_STATUS = 'TASK_STATUS';

export function fetchTasks (){
  return dispatch => {
    dispatch({
      type: TASK_STATUS,
      payload: true
    });
    tasksRef.on('value', snapshot => {
      dispatch({
        type: FETCH_TASKS,
        payload: snapshot.val()
      });
      dispatch({
        type: TASK_STATUS,
        payload: false
      });
    }, () => {
      dispatch({
        type: TASK_STATUS,
        payload: -1
      });
    });
  };
};

export const fetchUser = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: FETCH_USER,
        payload: user
      });
    } else {
      dispatch({
        type: FETCH_USER,
        payload: null
      });
    }
  });
};

export function login(email, password) {
  return dispatch => authRef.signInWithEmailAndPassword(email, password);
}

export function logout() {
  return dispatch => authRef.signOut();
}