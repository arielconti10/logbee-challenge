
import { tasksRef, database, authRef } from "../config/firebase";
import { FETCH_TASKS, FETCH_TASKS_SEARCH,FETCH_USER } from "./types";
export const TASK_STATUS = 'TASK_STATUS';
export const LOADING_SEARCH = 'LOADING_SEARCH';

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

export function searchTask(search) {
  if(search){
    console.log(search);
    return dispatch => {
      dispatch({
        type: LOADING_SEARCH,
        payload: true
      });
      database.ref('tasks').orderByChild('name').equalTo(search).on('value', function (snapshot) {
        dispatch({
          type: FETCH_TASKS_SEARCH,
          payload: snapshot.val()
        });
        dispatch({
          type: LOADING_SEARCH,
          payload: false
        });
      })
    }
  } else {
    return dispatch => {
      tasksRef.on('value', snapshot => {
        dispatch({
          type: FETCH_TASKS,
          payload: snapshot.val()
        });
        dispatch({
          type: TASK_STATUS,
          payload: false
        });
      })
    }
  }
}

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