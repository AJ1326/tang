import {SHOW_LOADER} from '../actions/loaderAction';
import {HIDE_LOADER} from '../actions/loaderAction';
// reducer
export default (state = {loadingText: ''}, {payload, type}) => {
  switch (type) {
    case SHOW_LOADER:
      return {...state, visible: true, loadingText: payload};
    case HIDE_LOADER:
      return {loadingText: ''};
    default:
      return state;
  }
};
