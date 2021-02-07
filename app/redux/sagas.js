import {all} from 'redux-saga/effects';
import {sagas as contactList} from './modules/sagas/contactListSaga';
import {sagas as errorModal} from './modules/sagas/errorModalSaga';

export default function* rootSaga() {
  yield all(
    [
      ...contactList,
      ...errorModal,
    ]
      .map(func => func())
  );
}
