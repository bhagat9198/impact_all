import axios from 'axios';
import config from './config';
const { BASE_URL } = config

export const signupUser = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/signup`, data)
    return res.data;
  } catch (error) {
    console.log('signupUser :: error :: ', error);
    return {
      status: false,
      data: error.message,
    }
  }
}

export const signinUser = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/signin`, data)
    return res.data
  } catch (error) {
    console.log('signinUser :: error :: ', error);
    return {
      status: false,
      data: error.message
    }
  }
}

export const getUserDetails = async (data) => {
  try {
    const res = await axios.get(`${BASE_URL}/user-details`, {
      headers: {
        'x-access-token': data
      }
    })
    return res.data;
  } catch (error) {
    console.log('getUserDetails :: error :: ', error);
    return {
      status: false,
      data: error.message
    }
  }
}

export const logoutUser = async(data) => {
  try {
    const res = await axios.get(`${BASE_URL}/logout`, {
      headers: {
        'x-access-token': data
      }
    })
    return res.data;
  } catch (error) {
    console.log('logoutUser :: error :: ', error);
    return {
      status: false,
      data: error.message
    }
  }
}