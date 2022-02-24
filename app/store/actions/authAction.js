import { SET_CURRENT_USER, GET_ERRORS } from './types'
import apiClient, { setAuthHeader } from '../../utils/client'
import JwtDecode from 'jwt-decode'
import authStorage from '../storage'

export const LoginHandler = (data, navigation, toast) => async (dispatch) => {
  const endpoint = '/login'
  const response = await apiClient.post(endpoint, data)
  if (response.ok) {
    const token = response.data
    // //storing token in localStorage
    await authStorage.storeToken(token)
    const decoded = JwtDecode(token)
    //set current user
    dispatch(setCurrentUser(decoded))
    return navigation.push('kyc')
  } else {
    dispatch({
      type: GET_ERRORS,
      payload: response.data,
    })
    return toast.show({
      title: 'login failed',
      status: 'error',
      description: response.data,
    })
  }
}
export const RegisterHandler =
  (data, navigation, toast) => async (dispatch) => {
    const endpoint = '/signup'
    const response = await apiClient.post(endpoint, data)
    if (response.ok) {
      return navigation.push('login')
    } else {
      dispatch({
        type: GET_ERRORS,
        payload: response.data,
      })
      return toast.show({
        title: 'Signup Failed',
        status: 'error',
        description: response.data,
      })
    }
  }

export const KycHandler = (data, navigation, toast) => async (dispatch) => {
  const endpoint = '/verifyKyc'
  const token = await authStorage.getToken()
  setAuthHeader(token)
  const response = await apiClient.post(endpoint, data)
  if (response.ok) {
    navigation.push('home')
  } else {
    dispatch({
      type: GET_ERRORS,
      payload: response.data,
    })
    return toast.show({
      title: 'Kyc Error',
      status: 'error',
      description: response.data,
    })
  }
}

export const sendUserLocation = (data, toast) => async (dispatch) => {
  const endpoint = '/user-location'
  const token = await authStorage.getToken()
  setAuthHeader(token)
  const response = await apiClient.post(endpoint, data)
  if (!response.ok) {
    dispatch({
      type: GET_ERRORS,
      payload: response.data,
    })
    return toast.show({
      title: 'Location Error',
      status: 'error',
      description: response.data,
    })
  }
  toast.show({
    title: 'Location Send',
    status: 'success',
    description: response.data,
  })
  return response.data
}

export const sendBotMessage =
  (data, setMessages, messages) => async (dispatch) => {
    const endpoint = '/message_bot'
    if (data !== '' || data.length !== 0) {
      const body = {
        message: data,
      }
      // const token = await authStorage.getToken()
      // setAuthHeader(token)
      const response = await apiClient.post(endpoint, body)
      if (!response.ok) {
        dispatch({
          type: GET_ERRORS,
          payload: response.data,
        })
      }

      const result = response.data.message
      setMessages([
        ...messages,
        {
          user: data,
          bot: result,
        },
      ])
    }
  }

export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
  }
}

//Logout User
export const Logout = (navigation) => async (dispatch) => {
  //remove token from localStorage
  await authStorage.removeToken()
  //set current user to {}
  dispatch(setCurrentUser({}))
  navigation.push('login')
}
