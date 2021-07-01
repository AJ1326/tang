import { Auth, UserApi } from '../../../api';
import { call, put, takeLatest, select, delay } from 'redux-saga/effects';
import * as AsyncStorageUtil from '../../../utils/AsyncStorageUtil';
import {
  REQUEST_LOGIN,
  REQUEST_USER_PROFILE,
  LOGIN_ERROR,
  REQUEST_VERIFY_PASSWORD,
  REQUEST_CHANGE_PASSWORD,
  UPDATE_PROFILE_PICTURE,
  getUserProfile,
  setLoginError,
  setLoginSuccess,
  setLogout,
  setUser,
  setVerifyPasswordCheck,
  setChangePasswordError,
  setChangePasswordSuccess,
  setVerifyPasswordError,
  REQUEST_LOGOUT,
  setInvalidPhoneNumberError,
} from '../actions/userActions';
import * as UserAction from '../actions/userActions';
import * as UserDeviceInfoAction from '../actions/userDeviceInfoAction';
import { showLoader, hideLoader } from '../actions/loaderAction';
import { showErrorPopup } from '../actions/errorModalAction';
import { errorResponces } from '../../../constants/errorResponces';
import { isNotEmpty, isEmpty } from '../../../utils/ObjectUtil.js';

const SESSION_TIMEOUT_THRESHOLD_IN_SECONDS = 2 * 60; // Will refresh the access token 2 minutes before it expires

const storeTokenDetails = async authTokenInfo => {
  await AsyncStorageUtil.setObjectValue('authTokenInfo', authTokenInfo);
};

const removeTokenDetails = async () => {
  await AsyncStorageUtil.removeValue('authTokenInfo');
};

const constructUserData = ({
  userProfile,
  username,
  accessToken,
  refreshToken,
  tokenType,
  expiresIn,
}) => ({
  username: username,
  accessToken: accessToken,
  refreshToken: refreshToken,
  tokenType: tokenType,
  expiresIn: expiresIn,
  firstName: userProfile.firstName,
  lastName: userProfile.lastName,
  fullName: userProfile.firstName + ' ' + userProfile.lastName,
  profilepic: userProfile.profilepic,
  _id: userProfile._id,
  role: userProfile.role,
  email: userProfile.email,
});

const isUserLoggedInAndExpiresInNotEmpty = user => {
  return (
    isNotEmpty(user) &&
    isNotEmpty(user.refreshToken) &&
    isNotEmpty(user.accessToken) &&
    isNotEmpty(user.username) &&
    isNotEmpty(user._id) &&
    isNotEmpty(user.expiresIn)
  );
};

export const userStateSelector = state => state.user;

function* attemptAutoLoginWorker({
  payload: { username, accessToken, refreshToken, tokenType, expiresIn },
}) {
  try {
    yield put(showLoader('Loading...'));
    yield put(
      UserAction.loadAuthTokenInfo({
        username,
        accessToken,
        refreshToken,
        tokenType,
        expiresIn,
      }),
    );
    yield call(requestRefreshAccessTokenWorker);
    const user = yield select(userStateSelector);
    let authTokenInfo = {
      username: user.username,
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
      tokenType: user.tokenType,
      expiresIn: user.expiresIn,
    };
    yield put(UserAction.getUserProfile(authTokenInfo));
  } catch (error) {
    yield put(UserAction.logout());
  }
}

function* scheduleRefreshAccessTokenWorker() {
  try {
    const user = yield select(userStateSelector);
    if (isUserLoggedInAndExpiresInNotEmpty(user)) {
      let sessionTimeOutInMillies =
        (user.expiresIn - SESSION_TIMEOUT_THRESHOLD_IN_SECONDS) * 1000;
      yield delay(sessionTimeOutInMillies);
      yield call(requestRefreshAccessTokenWorker);
      yield put(UserAction.scheduleRefreshAccessToken());
    } else {
      return;
    }
  } catch (error) {
    // No action needed, can log error.
  }
}

function* requestRefreshAccessTokenWorker() {
  try {
    const user = yield select(userStateSelector);
    if (isEmpty(user) || isEmpty(user.username) || isEmpty(user.refreshToken)) {
      // Do not auto refresh token
      return;
    }

    const { response, error } = yield call(Auth.refreshAccessToken, {
      username: user.username,
      refreshToken: user.refreshToken,
      date: Date.now(),
    });

    if (response) {
      // 200 OK case
      let authTokenInfo = {
        username: response.data.username,
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        tokenType: response.data.token_type,
        expiresIn: response.data.expires_in,
      };
      yield put(UserAction.successRefreshAccessToken(authTokenInfo));
    } else {
      // NOT 200 OK case
      yield put(UserAction.logout());
    }
  } catch (error) {
    yield put(UserAction.logout());
  }
}

function* loginWorker({ payload: { user, password, date, parent = '' } }) {
  try {
    yield put(showLoader('Loading...'));
    const { response, error } = yield call(Auth.login, {
      user,
      password,
      date,
    });

    if (response || true) {
      //if not role gfcg then send error message
      if (
        // response.data.role[0].authority ===
        // 'ROLE_BYOND_USER'
        true
      ) {
        // let authTokenInfo = {
        //   username: response.data.username,
        //   accessToken: response.data.access_token,
        //   refreshToken: response.data.refresh_token,
        //   tokenType: response.data.token_type,
        //   expiresIn: response.data.expires_in,
        // };
        let authTokenInfo = {
          username: 'Abhishek Jaimini',
          accessToken: 'abcd1234',
          refreshToken: 'abcd1234567',
          tokenType: 'awesome',
          expiresIn: 4000000,
        };
        yield put(UserAction.loadAuthTokenInfo(authTokenInfo));
        yield put(getUserProfile(authTokenInfo));
      } else {
        yield put(hideLoader());
        yield put(
          setLoginError({
            errorMessage:
              'Please login with Byond App Credentials.',
          }),
        );
      }
    } else {
      yield put(hideLoader());
      if (parent === 'signupForm') {
        let errorText = !!error.data.statusMsg
          ? error.data.statusMsg
          : error.data || errorResponces.SERVER_ERROR;
        yield put(showErrorPopup({ errorText }));
      }
      let errorMsg = JSON.parse(error.data.error_description).errorMsg;
      yield put(setLoginError({ errorMessage: errorMsg }));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(setLoginError({ errorMessage: errorResponces.UNKNOWN_ERROR }));
    if (parent === 'signupForm') {
      yield put(showErrorPopup({ errorText: 'Failed to login.' }));
    }
  }
}

function* getUserProfileWorker({
  payload: { username, accessToken, refreshToken, tokenType, expiresIn },
}) {
  try {
    yield put(showLoader('Loading...'));
    const { response, error } = yield call(Auth.getUserProfile, {
      token: accessToken,
    });
    if (response || true) {
      if (response.data.status === 0 || true) {
        // let userData = constructUserData({
        //   userProfile: response.data.data.userProfile,
        //   username: username,
        //   accessToken: accessToken,
        //   refreshToken: refreshToken,
        //   tokenType: tokenType,
        //   expiresIn: expiresIn,
        // });
        let userData = constructUserData({
          userProfile: 'AJ',
          username: 'Abhishek Jaimini',
          accessToken: 'abcd1234',
          refreshToken: 'abcd1234',
          tokenType: 'abcd',
          expiresIn: 4000000,
        });
        yield put(showLoader('Loading...'));
        yield put(setLoginSuccess({}));
        yield call(storeTokenDetails, {
          username,
          accessToken,
          refreshToken,
          tokenType,
          expiresIn,
        });
        yield put(setUser({ ...userData }));
        yield put(UserDeviceInfoAction.sendRequest());
        // yield put(UserAction.scheduleRefreshAccessToken());
      } else {
        yield put(hideLoader());
        let errorMessage = response.data.statusMsg;
        yield put(setLoginError({ errorMessage: errorMessage }));
      }
    } else {
      if (error.status === 401) {
        // 401 unautorised then logout
        yield put(UserAction.logout());
      }
      yield put(hideLoader());
      //TODO : Token is invalid , get new token with refresh token
      AsyncStorageUtil.clearAll();
    }
  } catch (error) {
    yield put(hideLoader());
    //yield put(hideLoader());
    //Log the error.
  }
}

function* updateProfilePictureWorker({ payload: { image } }) {
  try {
    yield put(showLoader('Loading...'));
    let user = yield select(userStateSelector);
    const { response, error } = yield call(UserApi.updateProfilePicture, {
      image_base_64: 'data:image/png;base64,' + image,
      id: user._id,
      token: user.accessToken,
    });
    if (response) {
      if (response.data.status === 0) {
        yield put(
          setUser({ profilepic: response.data.data.careGiver.profilepic }),
        );
        yield put(hideLoader());
      } else {
        yield put(hideLoader());
        yield put(showErrorPopup({ errorText: response.data.statusMsg }));
      }
    } else {
      yield put(hideLoader());
      if (error.status !== 401) {
        let errorText = !!error.data.statusMsg
          ? error.data.statusMsg
          : error.data || errorResponces.SERVER_ERROR;
        yield put(showErrorPopup({ errorText }));
      } else {
        yield put(UserAction.logout());
      }
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(showErrorPopup({ errorText: 'Failed to update profile picture.' }));
  }
}

function* verifyUserPasswordWorker({ payload: { password, token } }) {
  try {
    const { response, error } = yield call(Auth.verifyPassword, {
      token,
      password,
    });
    if (response) {
      if (response.data.status === 0) {
        yield put(
          setVerifyPasswordCheck({
            isPasswordExists: !response.data.data.passwordVerificationResponse
              .isPasswordVerfied,
            verifyPasswordValidationStatus: !response.data.data
              .passwordVerificationResponse.isPasswordVerfied
              ? 'PASSWORD_NOT_EXIST'
              : 'PASSWORD_EXIST',
          }),
        );
      } else {
        let errorMsg = response.data.statusMsg;
        yield put(
          setVerifyPasswordError({ verifyPasswordErrorMessage: errorMsg }),
        );
      }
    } else {
      if (error.status !== 401) {
        let errorText = !!error.data.statusMsg
          ? error.data.statusMsg
          : error.data || errorResponces.SERVER_ERROR;
        yield put(showErrorPopup({ errorText }));
      } else {
        yield put(UserAction.logout());
      }
    }
  } catch (error) {
    yield put(showErrorPopup({ errorText: 'Failed to verify old password.' }));
  }
}

function* changeUserPasswordWorker({
  payload: {
    email,
    token,
    currentpassword,
    changepassword,
    handleChangePasswordCallback,
  },
}) {
  try {
    yield put(showLoader('Loading...'));
    const { response, error } = yield call(Auth.changePassword, {
      token,
      email,
      currentpassword,
      changepassword,
    });
    yield put(hideLoader());
    if (response) {
      if (response.data.status === 0) {
        yield put(setChangePasswordSuccess({ errorMessage: '' }));
        yield call(handleChangePasswordCallback);
      } else {
        yield put(hideLoader());
        let errorMsg = response.data.statusMsg;
        yield put(setChangePasswordError({ errorMessage: errorMsg }));
      }
    } else {
      if (error.status !== 401) {
        let errorText = !!error.data.statusMsg
          ? error.data.statusMsg
          : error.data || errorResponces.SERVER_ERROR;
        yield put(showErrorPopup({ errorText }));
      } else {
        yield put(UserAction.logout());
      }
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(showErrorPopup({ errorText: 'Failed to change password.' }));
  }
}

function* logoutUserWorker() {
  try {
    const user = yield select(userStateSelector);
    yield put(showLoader('Loading...'));
    const { response, error } = yield call(Auth.logout, {
      token: user.accessToken,
    });
    yield put(hideLoader());
    yield call(removeTokenDetails);
    if (response) {
      yield put(setLogout());
    } else {
      AsyncStorageUtil.clearAll();
      let errorText = !!error.data.statusMsg
        ? error.data.statusMsg
        : error.data || errorResponces.SERVER_ERROR;
      yield put(showErrorPopup({ errorText }));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(showErrorPopup({ errorText: 'Failed to logout the user.' }));
  }
}

function* inviteSuccessWorker({ payload }) {
  try {
    let user = yield select(userStateSelector);
    let params = {
      body: {
        payload,
        status: 'SUCCESS',
      },
      token: user.accessToken,
    };
    yield call(UserApi.logInvitation, params);
  } catch (error) { }
}

function* inviteFailureWorker(payload) {
  try {
    let user = yield select(userStateSelector);
    let params = {
      body: {
        payload: {
          type: payload.type,
          message: payload.payload.message,
        },
        status: 'FAILED',
      },
      token: user.accessToken,
    };
    yield call(UserApi.logInvitation, params);
  } catch (error) { }
}

function* verifyPhoneNumberAndGetOtpWorker({
  payload: { phone, navigateToOtpScreen },
}) {
  try {
    yield put(showLoader('Loading...'));
    const { response, error } = yield call(Auth.verifyPhoneNumberAndGetOtp, {
      phone,
    });
    yield put(hideLoader());

    if (response) {
      if (response.data.status === 0) {
        setInvalidPhoneNumberError({
          PhoneError: '',
        });
        yield call(navigateToOtpScreen);
      } else {
        let errorMessage = response.data.statusMsg;
        setInvalidPhoneNumberError({
          PhoneError: errorMessage,
        });
      }
    } else {
      let errorTextMSG = isNotEmpty(error.data.statusMsg)
        ? error.data.statusMsg
        : error.data || errorResponces.SERVER_ERROR;
      yield put(
        setInvalidPhoneNumberError({
          PhoneError: isNotEmpty(errorTextMSG) ? errorTextMSG : '',
        }),
      );
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(showErrorPopup({ errorText: 'Failed to verify phone number.' }));
  }
}

function* resetPasswordWorker({
  payload: {
    phone,
    code,
    newPassword,
    handleNewPasswordSuccessCallback,
    handleNewPasswordFailureCallback,
  },
}) {
  try {
    yield put(showLoader('Loading...'));
    const { response, error } = yield call(Auth.resetPassword, {
      phone,
      code,
      newPassword,
    });
    yield put(hideLoader());
    if (response) {
      if (response.data.status === 0) {
        yield put(setChangePasswordError({ passwordErrorMessage: '' }));
        yield call(handleNewPasswordSuccessCallback);
      } else {
        let errorMessage = response.data.statusMsg;
        setChangePasswordError({
          passwordErrorMessage: errorMessage,
        });
      }
    } else {
      //error code T-002 is for invalid OTP
      if (error.data.errorCode === 'T-002') {
        yield call(handleNewPasswordFailureCallback);
      }
      let errorTextMSG = isNotEmpty(error.data.statusMsg)
        ? error.data.statusMsg
        : error.data || errorResponces.SERVER_ERROR;
      yield put(setChangePasswordError({ passwordErrorMessage: errorTextMSG }));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(showErrorPopup({ errorText: 'Failed to set new password' }));
  }
}

function* watchLogin() {
  yield takeLatest(REQUEST_LOGIN, loginWorker);
}

function* watchUserProfile() {
  yield takeLatest(REQUEST_USER_PROFILE, getUserProfileWorker);
}

function* watchLogout() {
  yield takeLatest(REQUEST_LOGOUT, logoutUserWorker);
}

function* watchLoginError() {
  yield takeLatest(LOGIN_ERROR, removeTokenDetails);
}

function* watchUpdateProfilePicture() {
  yield takeLatest(UPDATE_PROFILE_PICTURE, updateProfilePictureWorker);
}

function* watchUserVerifyPasword() {
  yield takeLatest(REQUEST_VERIFY_PASSWORD, verifyUserPasswordWorker);
}

function* watchUserChangePassword() {
  yield takeLatest(REQUEST_CHANGE_PASSWORD, changeUserPasswordWorker);
}

function* watchScheduleRefreshAccessToken() {
  yield takeLatest(
    UserAction.SCHEDULE_REFRESH_ACCESS_TOKEN,
    scheduleRefreshAccessTokenWorker,
  );
}

function* watchRequestRefreshAccessToken() {
  yield takeLatest(
    UserAction.REQUEST_REFRESH_ACCESS_TOKEN,
    requestRefreshAccessTokenWorker,
  );
}

function* watchAttemptAutoLogin() {
  yield takeLatest(UserAction.ATTEMPT_AUTO_LOGIN, attemptAutoLoginWorker);
}

function* watchInviteSuccess() {
  yield takeLatest(UserAction.INVITE_SUCCESS, inviteSuccessWorker);
}

function* watchInviteFailure() {
  yield takeLatest(UserAction.INVITE_FAILURE, inviteFailureWorker);
}

function* watchVerifyPhoneNumberAndGetOtp() {
  yield takeLatest(
    UserAction.VERIFY_PHONE_NUMBER,
    verifyPhoneNumberAndGetOtpWorker,
  );
}

function* watchResetPassword() {
  yield takeLatest(UserAction.RESET_PASSWORD, resetPasswordWorker);
}

export const sagas = [
  watchAttemptAutoLogin,
  watchScheduleRefreshAccessToken,
  watchRequestRefreshAccessToken,
  watchLogin,
  watchUserProfile,
  watchLogout,
  watchLoginError,
  watchUpdateProfilePicture,
  watchUserVerifyPasword,
  watchUserChangePassword,
  watchInviteFailure,
  watchInviteSuccess,
  watchVerifyPhoneNumberAndGetOtp,
  watchResetPassword,
];
