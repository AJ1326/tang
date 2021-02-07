import {combineReducers} from 'redux';
import contactList from './reducers/contactListReducer.js';
import popup from './reducers/popupReducer';
import loader from './reducers/loaderReducer';
import errorModal from './reducers/errorModalReducer';

export default combineReducers({
  contactList,
  popup,
  loader,
  errorModal,
});
