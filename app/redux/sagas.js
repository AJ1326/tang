import { all } from 'redux-saga/effects';
import { sagas as contactList } from './modules/sagas/contactListSaga';
import { sagas as errorModal } from './modules/sagas/errorModalSaga';
import { sagas as userDeviceInfo } from './modules/sagas/userDeviceInfoSaga';
import { sagas as user } from './modules/sagas/userSaga';
import { sagas as signup } from './modules/sagas/signupSaga';

export default function* rootSaga() {
  yield all(
    [
      ...contactList,
      ...errorModal,
      ...userDeviceInfo,
      ...signup,
      ...user,
    ]
      .map(func => func())
  );
}
