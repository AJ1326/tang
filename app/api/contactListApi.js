/**
 * APIs related with contactList
**/
import axios from 'axios';

/**
 * Dummy api structure to get the contact list.
 * Given code can be used if we are collecting contact information via API.
 * Where token,page,pageSize are functional params that are passed to the api call.
**/
export const getContactList = params => {
  return axios({
    method: 'get',
    url:
      '/calling-dummy-api/contactList?access_token=' +
      params.token +
      '&pageSize=' +
      params.pageSize +
      '&pageNumber=' +
      params.page,
    headers: {'Content-Type': 'application/json'},
  })
    .then(response => ({response}))
    .catch(error => ({error: error.response}));
};
