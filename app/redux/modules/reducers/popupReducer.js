import {SET_POPUP} from '../actions/popupAction';
// reducer
export default (state = {}, {payload, type}) => {
  switch (type) {
    case SET_POPUP:
      return {...state, ...payload};
    default:
      return state;
  }
};
