export const SET_ERROR_TEXT = 'errorModal/setErrorText';
export const REMOVE_ERROR_TEXT = 'errorModal/removeErrorText';
export const SHOW_ERROR_POPUP = 'errorModal/showErrorPopup';

export const setErrorText = (payload = '') => ({
  type: SET_ERROR_TEXT,
  payload,
});

export const removeErrorText = (payload = {}) => ({
  type: REMOVE_ERROR_TEXT,
  payload,
});

export const showErrorPopup = (payload = {}) => ({
  type: SHOW_ERROR_POPUP,
  payload,
});
