
import { tasksRef , authRef } from "../config/firebase";
import { FETCH_TASKS, FETCH_USER } from "./types";

export const fetchTasks = uid => async dispatch => {
  tasksRef.child(uid).on("value", snapshot => {
    dispatch({
      type: FETCH_TASKS,
      payload: snapshot.val()
    });
  });
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