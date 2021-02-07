import {put, takeLatest} from 'redux-saga/effects';
import {SHOW_ERROR_POPUP, setErrorText} from '../actions//errorModalAction';
import {showPopup} from '../actions/popupAction';
import PopupEnum from '../../../constants/enums/popupEnum';

function* showErrorPopupWorker({payload: {errorText}}) {
  yield put(setErrorText(errorText));
  yield put(showPopup(PopupEnum.ERROR_POPUP));
}

function* watchShowErrorPopup() {
  yield takeLatest(SHOW_ERROR_POPUP, showErrorPopupWorker);
}

export const sagas = [watchShowErrorPopup];
