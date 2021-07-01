import axios from 'axios';

export const sendUserDeviceInfo = (token, userDeviceInfo) => {
  return axios({
    method: 'post',
    url: '/user-device-info/send?access_token=' + token,
    headers: {'Content-Type': 'application/json'},
    data: userDeviceInfo,
  })
    .then(response => ({response}))
    .catch(error => ({error: error.response}));
};
