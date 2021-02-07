import {
  SET_CONTACT_LIST,
  RESET_CONTACT_LIST,
  SET_SELECTED_CONTACT,
} from '../actions/contactListAction.js';
// reducer
export default (state = 
  {
    contactListData: [], 
    isJoinContactList: true,
    selectedContact:  {}
  }, {payload, type}) => {
  switch (type) {
    case SET_CONTACT_LIST:
      return {
        ...state,
        contactListData: !!state.contactListData && payload.isJoinContactList
          ? [...state.contactListData, ...payload.contactListData]
          : payload.contactListData
      };
    case SET_SELECTED_CONTACT:
      return {
        ...state,
        selectedContact: payload.selectedContact,
      };
    case RESET_CONTACT_LIST:
      return {
        ...state,
        contactListData: [],
      };
    default:
      return state;
  }
};
