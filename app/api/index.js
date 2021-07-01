import axios from 'axios';
axios.defaults.baseURL = 'https://dummyUrlStructure/api';
import * as contactListApi from './contactListApi.js';
import * as Auth from './auth';
import * as UserApi from './userApi';
import * as UserDeviceInfoApi from './userDeviceInfoApi';

export {
  contactListApi,
  UserDeviceInfoApi,
  Auth,
  UserApi
};
