import axios from 'axios';

export const updateProfilePicture = params => {
  let paramsObject = {
    _id: params.id,
    profilepic: params.image_base_64,
  };
  return axios({
    method: 'post',
    url:
      '/familycaregiver/services/updateFamilyCareGiverPersonalInfomation?access_token=' +
      params.token,
    headers: {'Content-Type': 'application/json'},
    data: paramsObject,
  })
    .then(response => ({response}))
    .catch(error => ({error: error.response}));
};

export const logInvitation = params => {
  return axios({
    method: 'post',
    url: '/invitation-logs?access_token=' + params.token,
    headers: {'Content-Type': 'application/json'},
    data: params.body,
  });
};
