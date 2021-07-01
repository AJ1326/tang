import axios from 'axios';
import qs from 'qs';

export const login = params => {
  let paramsObject = {
    grant_type: 'password',
    client_id: 'restapp',
    client_secret: 'restapp',
    username: params.user,
    password: params.password,
    date: params.date,
  };

  return axios({
    method: 'post',
    url: '/oauth/token',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data: qs.stringify(paramsObject),
  })
    .then(response => ({response}))
    .catch(error => ({error: error.response}));
};

export const refreshAccessToken = params => {
  let paramsObject = {
    grant_type: 'refresh_token',
    client_id: 'restapp',
    client_secret: 'restapp',
    username: params.username,
    refresh_token: params.refreshToken,
    date: params.date,
  };

  return axios({
    method: 'post',
    url: '/oauth/token',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data: qs.stringify(paramsObject),
  })
    .then(response => ({response}))
    .catch(error => ({error: error.response}));
};

export const getUserProfile = ({token}) => {
  return axios({
    method: 'post',
    url: '/common/services/user-profile?access_token=' + token,
    headers: {'Content-Type': 'application/json'},
    data: '',
  })
    .then(response => ({response}))
    .catch(error => ({error: error.response}));
};

export const register = params => {
  let paramsObject = {
    role: 'ROLE_GENERAL_FAMILY_CARE_GIVER',
    firstName: params.firstName,
    lastName: params.lastName,
    email: params.email,
    password: params.password,
    phone: params.phone,
  };

  return axios({
    method: 'post',
    url: '/familyCareGiverSignUp',
    headers: {'Content-Type': 'application/json'},
    data: paramsObject,
  })
    .then(response => ({response}))
    .catch(error => ({error: error.response}));
};

export const isCareGiverExistsWithGivenEmail = params => {
  let paramsObject = {
    email: params.email,
  };

  return axios({
    method: 'post',
    url: '/checkCareGiverEmail',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data: qs.stringify(paramsObject),
  })
    .then(response => ({response}))
    .catch(error => ({error: error.response}));
};

export const verifyPassword = params => {
  let paramsObject = {
    password: params.password,
  };

  return axios({
    method: 'post',
    url: '/users/password/verify?access_token=' + params.token,
    headers: {'Content-Type': 'application/json'},
    data: paramsObject,
  })
    .then(response => ({response}))
    .catch(error => ({error: error.response}));
};

export const changePassword = params => {
  let paramsObject = {
    email: params.email,
    currentpassword: params.currentpassword,
    changepassword: params.changepassword,
  };

  return axios({
    method: 'post',
    url: '/common/services/changePassword?access_token=' + params.token,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data: qs.stringify(paramsObject),
  })
    .then(response => ({response}))
    .catch(error => ({error: error.response}));
};

export const logout = params => {
  let paramsObject = {
    token: params.token,
  };
  return axios({
    method: 'post',
    url: '/oauth/token/revoke',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data: qs.stringify(paramsObject),
  })
    .then(response => ({response}))
    .catch(error => ({error: error.response}));
};

const role = 'ROLE_GENERAL_FAMILY_CARE_GIVER';
export const verifyPhoneNumberAndGetOtp = params => {
  let paramsObject = {
    role: role,
    phone: params.phone,
  };

  return axios({
    method: 'post',
    url: '/users/phone-verify-request',
    headers: {'Content-Type': 'application/json'},
    data: paramsObject,
  })
    .then(response => ({response}))
    .catch(error => ({error: error.response}));
};

export const resetPassword = params => {
  let paramsObject = {
    role: role,
    phone: params.phone,
    code: params.code,
    newPassword: params.newPassword,
  };

  return axios({
    method: 'post',
    url: '/users/reset-password',
    headers: {'Content-Type': 'application/json'},
    data: paramsObject,
  })
    .then(response => ({response}))
    .catch(error => ({error: error.response}));
};
