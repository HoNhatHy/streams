import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
} from "./types";

import streams from "../apis/stream";
import history from "../history";

export const signIn = function (userId) {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = function () {
  return {
    type: SIGN_OUT,
  };
};

export const createStream = function (formValues) {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await streams.post("/streams", { ...formValues, userId });

    dispatch({
      type: CREATE_STREAM,
      payload: response.data,
    });

    history.push("/");
  };
};

export const fetchStreams = function () {
  return async (dispatch) => {
    const response = await streams.get("/streams");

    dispatch({
      type: FETCH_STREAMS,
      payload: response.data,
    });
  };
};

export const fetchStream = function (id) {
  return async (dispatch) => {
    const response = await streams.get(`/streams/${id}`);

    dispatch({
      type: FETCH_STREAM,
      payload: response.data,
    });
  };
};

export const editStream = function (id, formValues) {
  return async (dispatch) => {
    const response = await streams.patch(`/streams/${id}`, formValues);

    dispatch({
      type: EDIT_STREAM,
      payload: response.data,
    });

    history.push("/");
  };
};

export const deleteStream = function (id) {
  return async (dispatch) => {
    await streams.delete(`/streams/${id}`);

    dispatch({
      type: DELETE_STREAM,
      payload: id,
    });

    history.push("/");
  };
};
