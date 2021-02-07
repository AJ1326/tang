import {SET_ERROR_TEXT} from '../actions/errorModalAction';
import {REMOVE_ERROR_TEXT} from '../actions/errorModalAction';
// reducer
export default (state = {errorText: ''}, {payload, type}) => {
  switch (type) {
    case SET_ERROR_TEXT:
      return {...state, errorText: payload};
    case REMOVE_ERROR_TEXT:
      return {errorText: ''};
    default:
      return state;
  }
};
