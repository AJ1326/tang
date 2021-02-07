import {Platform} from 'react-native';
import * as AsyncStorageUtil from './AsyncStorageUtil';

export const USER_DEVICE_INFO_KEY = 'userDeviceInfo';

export const saveDeviceToken = async deviceToken => {
  let userDeviceInfo = {platformOS: Platform.OS, deviceToken: deviceToken};
  await AsyncStorageUtil.setObjectValue(USER_DEVICE_INFO_KEY, userDeviceInfo);
};

export const getUserDeviceInfo = async () => {
  let userDeviceInfo = await AsyncStorageUtil.getObjectValue(
    USER_DEVICE_INFO_KEY,
  );
  return userDeviceInfo;
};
