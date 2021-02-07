/**
 * Put actions and action creators here for popup
 */
export const SET_POPUP = 'popup/setPopup';

export const showPopup = (popupName = '') => ({
  type: SET_POPUP,
  payload: {[popupName]: true},
});

export const hidePopup = (popupName = '') => ({
  type: SET_POPUP,
  payload: {[popupName]: false},
});
