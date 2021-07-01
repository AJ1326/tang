import {
  SET_USER,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_SUCCESS,
  VERIFY_PASSWORD_EXISTS,
  VERIFY_PASSWORD_UPDATE,
  VERIFY_PASSWORD_ERROR,
  LOAD_AUTH_TOKEN_INFO,
  SUCCESS_REFRESH_ACCESS_TOKEN,
  LOGOUT,
  INVALID_PHONE_ERROR,
} from '../actions/userActions';

// reducer
export default (state = {}, {payload, type}) => {
  switch (type) {
    case LOAD_AUTH_TOKEN_INFO:
    case SUCCESS_REFRESH_ACCESS_TOKEN:
    case SET_USER:
    case LOGIN_ERROR:
    case VERIFY_PASSWORD_EXISTS:
    case CHANGE_PASSWORD_ERROR:
    case VERIFY_PASSWORD_ERROR:
    case INVALID_PHONE_ERROR:
      return {...state, ...payload};
    case LOGIN_SUCCESS:
    case CHANGE_PASSWORD_SUCCESS:
      return {...state, errorMessage: ''};
    case VERIFY_PASSWORD_UPDATE:
      return {
        ...state,
        isPasswordExists: false,
        verifyPasswordValidationStatus: 'IN_PROCESS',
      };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};
