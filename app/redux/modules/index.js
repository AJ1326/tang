import { combineReducers } from 'redux';
import contactList from './reducers/contactListReducer.js';
import popup from './reducers/popupReducer';
import loader from './reducers/loaderReducer';
import errorModal from './reducers/errorModalReducer';
import user from './reducers/userReducer';
import signup from './reducers/signupReducer';
import application from './reducers/applicationReducer';

export default combineReducers({
  user,
  contactList,
  signup,
  popup,
  loader,
  errorModal,
  application,
});
