export const SET_USER = 'user/setUserProfile';
export const REQUEST_LOGOUT = 'user/requestLogout';
export const LOGOUT = 'user/logout';
export const REQUEST_LOGIN = 'user/requestLogin';
export const REQUEST_USER_PROFILE = 'user/requestUserProfile';
export const LOGIN_ERROR = 'user/loginError';
export const LOGIN_SUCCESS = 'user/loginSuccess';
export const ATTEMPT_AUTO_LOGIN = 'user/attemptAutoLogin';
export const LOAD_AUTH_TOKEN_INFO = 'user/loadAuthTokenInfo';
export const SCHEDULE_REFRESH_ACCESS_TOKEN = 'user/sheduleRefreshAccessToken';
export const REQUEST_REFRESH_ACCESS_TOKEN = 'user/requestRefreshAccessToken';
export const SUCCESS_REFRESH_ACCESS_TOKEN = 'user/successRefreshAccessToken';
export const UPDATE_PROFILE_PICTURE = 'user/updateProfilePicture';
export const REQUEST_VERIFY_PASSWORD = 'user/verifyPassword';
export const VERIFY_PASSWORD_EXISTS = 'user/verifyPasswordExists';
export const VERIFY_PASSWORD_UPDATE = 'user/verifyPasswordUpdate';
export const REQUEST_CHANGE_PASSWORD = 'user/requestChangePassword';
export const CHANGE_PASSWORD_SUCCESS = 'user/changePasswordSuccess';
export const CHANGE_PASSWORD_ERROR = 'user/changePasswordError';
export const VERIFY_PASSWORD_ERROR = 'user/verifyPaswordError';
export const INVITE_SUCCESS = 'user/InviteSuccess';
export const INVITE_FAILURE = 'user/InviteFailure';
export const VERIFY_PHONE_NUMBER = 'user/verifyPhoneNumberAndGetOtp';
export const INVALID_PHONE_ERROR = 'user/invalidPhoneError';
export const RESET_PASSWORD = 'user/resetPassword';

export const attemptAutoLogin = (payload = {}) => ({
  type: ATTEMPT_AUTO_LOGIN,
  payload,
});

export const loadAuthTokenInfo = (payload = {}) => ({
  type: LOAD_AUTH_TOKEN_INFO,
  payload,
});

export const scheduleRefreshAccessToken = (payload = {}) => ({
  type: SCHEDULE_REFRESH_ACCESS_TOKEN,
  payload,
});

export const successRefreshAccessToken = (payload = {}) => ({
  type: SUCCESS_REFRESH_ACCESS_TOKEN,
  payload,
});

export const requestRefreshAccessToken = (payload = {}) => ({
  type: REQUEST_REFRESH_ACCESS_TOKEN,
  payload,
});

export const login = (payload = {}) => ({type: REQUEST_LOGIN, payload});
export const getUserProfile = (payload = {}) => ({
  type: REQUEST_USER_PROFILE,
  payload,
});
export const logout = (payload = {}) => ({type: REQUEST_LOGOUT, payload});

export const setLogout = (payload = {}) => ({
  type: LOGOUT,
  payload,
});

export const setLoginError = (payload = {}) => ({
  type: LOGIN_ERROR,
  payload,
});

export const setLoginSuccess = (payload = {}) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const setUser = (payload = {}) => ({
  type: SET_USER,
  payload,
});

export const verifyPassword = (payload = {}) => ({
  type: REQUEST_VERIFY_PASSWORD,
  payload,
});

export const setVerifyPasswordCheck = (payload = {}) => ({
  type: VERIFY_PASSWORD_EXISTS,
  payload,
});

export const verifyPasswordUpdate = (payload = {}) => ({
  type: VERIFY_PASSWORD_UPDATE,
  payload,
});

export const changePassword = (payload = {}) => ({
  type: REQUEST_CHANGE_PASSWORD,
  payload,
});

export const setChangePasswordSuccess = (payload = {}) => ({
  type: CHANGE_PASSWORD_SUCCESS,
  payload,
});

export const setChangePasswordError = (payload = {}) => ({
  type: CHANGE_PASSWORD_ERROR,
  payload,
});

export const setVerifyPasswordError = (payload = {}) => ({
  type: VERIFY_PASSWORD_ERROR,
  payload,
});

export const updateProfilePicture = (payload = {}) => ({
  type: UPDATE_PROFILE_PICTURE,
  payload,
});

export const inviteSuccess = (payload = {}) => ({
  type: INVITE_SUCCESS,
  payload,
});

export const inviteFailure = (payload = {}) => ({
  type: INVITE_FAILURE,
  payload,
});

export const verifyPhoneNumberAndGetOtp = (payload = {}) => ({
  type: VERIFY_PHONE_NUMBER,
  payload,
});

export const setInvalidPhoneNumberError = (payload = []) => ({
  type: INVALID_PHONE_ERROR,
  payload,
});

export const resetPassword = (payload = {}) => ({
  type: RESET_PASSWORD,
  payload,
});

