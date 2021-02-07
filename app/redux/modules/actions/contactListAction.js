/**
 * Put actions and action creators here for contactList
 */
export const REQUEST_CONTACT_LIST = 'contactlist/requestContactListLists';
export const SET_CONTACT_LIST = 'contactlist/setContactList';
export const SET_SELECTED_CONTACT = 'contactlist/setSelectedContactList';
export const RESET_CONTACT_LIST = 'contactlist/resetContactList';

export const getContactList = (payload = {}) => ({
  type: REQUEST_CONTACT_LIST,
  payload,
}); 

export const setContactList = (payload = {}) => ({
  type: SET_CONTACT_LIST,
  payload,
});

export const setSelectedContactList = (payload = {}) => ({
  type: SET_SELECTED_CONTACT,
  payload,
});

export const resetContactList = (payload = {}) => ({
  type: RESET_CONTACT_LIST,
  payload,
});
