// Action Types
export const SEND_REQUEST = 'userDeviceInfo/sendRequest';
export const SEND_SUCCESS = 'userDeviceInfo/sendSuccess';
export const SEND_FAILURE = 'userDeviceInfo/sendFailure';

// Action Creators
export const sendRequest = (payload = {}) => ({
  type: SEND_REQUEST,
  payload,
});

export const sendSuccess = (payload = {}) => ({
  type: SEND_SUCCESS,
  payload,
});

export const sendFailure = (payload = {}) => ({
  type: SEND_FAILURE,
  payload,
});
