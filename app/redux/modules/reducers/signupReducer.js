import {
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  SIGNUP_EMAIL_EXIST,
  SIGNUP_EMAIL_UPDATE,
} from '../actions/signupAction';
import {LOGOUT} from '../actions/userActions';
export default (
  state = {
    isEmailExists: false,
    emailValidationStatus: 'EMAIL_UPDATE_INPROGRESS',
  },
  {payload, type},
) => {
  switch (type) {
    case SIGNUP_ERROR:
    case SIGNUP_EMAIL_EXIST:
      return {...state, ...payload};
    case SIGNUP_EMAIL_UPDATE:
      return {
        ...state,
        isEmailExists: false,
        emailValidationStatus: 'EMAIL_UPDATE_INPROGRESS',
      };
    case SIGNUP_SUCCESS:
      return {...state, errorMessage: ''};
    case LOGOUT:
      return {};
    default:
      return state;
  }
};
