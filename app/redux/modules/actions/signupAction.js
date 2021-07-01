export const REQUEST_SIGNUP = 'signup/requestSignup';
export const REQUEST_EMAIL_CHECK_EXIST =
  'signup/requestCheckEmailExistsValidation';
export const SIGNUP_ERROR = 'signup/signUpError';
export const SIGNUP_SUCCESS = 'signup/signUpSuccess';
export const SIGNUP_EMAIL_EXIST = 'signup/signUpEmailExists';
export const SIGNUP_EMAIL_UPDATE = 'signup/emailUpdate';

export const signup = (payload = {}) => ({type: REQUEST_SIGNUP, payload});
export const checkEmailExists = (payload = {}) => ({
  type: REQUEST_EMAIL_CHECK_EXIST,
  payload,
});

export const setSignupError = (payload = {}) => ({
  type: SIGNUP_ERROR,
  payload,
});

export const setSignupSuccess = (payload = {}) => ({
  type: SIGNUP_SUCCESS,
  payload,
});

export const setIfEmailExist = (payload = {}) => ({
  type: SIGNUP_EMAIL_EXIST,
  payload,
});

export const emailUpdate = (payload = {}) => ({
  type: SIGNUP_EMAIL_UPDATE,
  payload,
});
