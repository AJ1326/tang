import {Auth} from '../../../api';
import {call, put, takeLatest} from 'redux-saga/effects';
import {
  REQUEST_SIGNUP,
  REQUEST_EMAIL_CHECK_EXIST,
  setSignupError,
  setSignupSuccess,
  setIfEmailExist,
} from '../actions/signupAction';
import {login} from '../actions/userActions';
import {showLoader, hideLoader} from '../actions/loaderAction';
import {errorResponces} from '../../../constants/errorResponces';

function* registerUser({
  payload: {firstName, lastName, email, password, phone},
}) {
  try {
    yield put(showLoader('Loading...'));
    const {response, error} = yield call(Auth.register, {
      firstName,
      lastName,
      email,
      password,
      phone,
    });

    if (response) {
      if (!!response.data.data.status) {
        //Email id already exists in our database!!
        yield put(hideLoader());
        let errorMsg = response.data.statusMsg;
        yield put(setSignupError({errorMessage: errorMsg}));
      } else {
        //signup successfull
        yield put(setSignupSuccess({errorMessage: '', isEmailExists: false}));
        yield put(
          login({
            user: email,
            password: password,
            date: Date.now(),
            parent: 'signupForm',
          }),
        );
      }
    } else {
      //If comes with some error code
      yield put(hideLoader());
      let errorMsg = error.data.statusMsg;
      yield put(setSignupError({errorMessage: errorMsg}));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(setSignupError({errorMessage: errorResponces.UNKNOWN_ERROR}));
  }
}

function* userEmailExists({payload: {email}}) {
  try {
    const {response, error} = yield call(Auth.isCareGiverExistsWithGivenEmail, {
      email,
    });
    if (response) {
      if (response.data.data.status.status === 'true') {
        yield put(
          setIfEmailExist({
            isEmailExists: true,
            emailValidationStatus: 'EMAIL_EXIST',
          }),
        );
      } else {
        yield put(
          setIfEmailExist({
            isEmailExists: false,
            emailValidationStatus: 'EMAIL_DOES_NOT_EXIST',
          }),
        );
      }
    } else {
      let errorMsg = JSON.parse(error.data.error_description).errorMsg;
      yield put(setSignupError({errorMessage: errorMsg}));
    }
  } catch (error) {
    yield put(setSignupError({errorMessage: errorResponces.UNKNOWN_ERROR}));
  }
}

function* watchSignup() {
  yield takeLatest(REQUEST_SIGNUP, registerUser);
}

function* watchEmailCheckExists() {
  yield takeLatest(REQUEST_EMAIL_CHECK_EXIST, userEmailExists);
}

export const sagas = [watchSignup, watchEmailCheckExists];
