import axios from 'axios';
axios.defaults.baseURL = 'https://dummyUrlStructure/api';
import * as contactListApi from './contactListApi.js';

export {
  contactListApi,
};
