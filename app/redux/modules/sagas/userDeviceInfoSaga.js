import { call, takeLatest, select } from 'redux-saga/effects';
import * as UserDeviceInfoAction from '../actions/userDeviceInfoAction';
import * as UserDeviceInfoUtil from '../../../utils/UserDeviceInfoUtil';
import * as UserDeviceInfoApi from '../../../api/userDeviceInfoApi';

const userStateSelector = state => state.user;

function* sendRequestWorker() {
  // Post successful login, app should send device info to backend.
  const user = yield select(userStateSelector);
  let userDeviceInfo = yield call(UserDeviceInfoUtil.getUserDeviceInfo);
  yield call(
    UserDeviceInfoApi.sendUserDeviceInfo,
    user.accessToken,
    userDeviceInfo,
  ); // send and forget.
}

function* watchSendRequest() {
  yield takeLatest(UserDeviceInfoAction.SEND_REQUEST, sendRequestWorker);
}

export const sagas = [watchSendRequest];
