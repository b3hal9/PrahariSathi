import apiClient, { setAuthHeader } from "../../utils/client";
import authStorage from "../storage";
import { GET_ALLPOST, GET_ERRORS, POST_LOADING } from "./types";

export const handle_addReport =
  (navigation, data, toast) => async (dispatch) => {
    const endpoint = "/user/addReport";
    const token = await authStorage.getToken();
    setAuthHeader(token);
    const response = await apiClient.post(endpoint, data);
    if (response.ok) {
      toast.show({
        title: "Report Sent",
        status: "success",
        description: response.data,
      });
      return navigation.push("home");
    } else {
      dispatch({
        type: GET_ERRORS,
        payload: response.data,
      });
      return toast.show({
        title: "Report Failed",
        status: "error",
        description: response.data,
      });
    }
  };

export const handle_getAllPost = (toast) => async (dispatch) => {
  dispatch(setPostloading());
  const endpoint = "/posts";
  const response = await apiClient.get(endpoint);
  if (response.ok) {
    dispatch({
      type: GET_ALLPOST,
      payload: response.data,
    });
  } else {
    dispatch({
      type: GET_ERRORS,
      payload: response.data,
    });
    return toast.show({
      title: "Post loading failed",
      status: "error",
      description: response.data,
    });
  }
};

//set post loading
export const setPostloading = () => {
  return {
    type: POST_LOADING,
  };
};

export const handle_getAllUserReport =
  (toast, setReports) => async (dispatch) => {
    dispatch(setPostloading());
    const endpoint = "/user/allreports";
    const token = await authStorage.getToken();
    setAuthHeader(token);
    const response = await apiClient.get(endpoint);
    if (response.ok) {
      return setReports(response.data);
    } else {
      dispatch({
        type: GET_ERRORS,
        payload: response.data,
      });
      return toast.show({
        title: "Report loading failed",
        status: "error",
        description: response.data,
      });
    }
  };
