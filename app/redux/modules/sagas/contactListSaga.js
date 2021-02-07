import {contactListApi} from '../../../api';
import {call, put, takeEvery} from 'redux-saga/effects';
import {
  REQUEST_CONTACT_LIST,
  setContactList,
} from '../actions/contactListAction';
import {showLoader, hideLoader} from '../actions/loaderAction';
import {showErrorPopup} from '../actions/errorModalAction';
// Get Contact List
import * as Contacts from 'expo-contacts';

async function getContactParams(filterParams) {
  const contactDataFilterParams = {
      fields: [
        Contacts.Fields.Name,
        Contacts.Fields.PhoneNumbers,
        Contacts.Fields.Image,
        Contacts.Fields.ImageAvailable,
        Contacts.Fields.ContactType,
        Contacts.Fields.Emails,
        Contacts.Fields.JobTitle,
        Contacts.Fields.Company
      ],
      sort: Contacts.SortTypes.FirstName,
      pageOffset: filterParams ? filterParams.pgOffset : 0,
      pageSize: filterParams ? filterParams.pgSize : 0,
  }
  filterParams.searchString && (contactDataFilterParams['name'] = (filterParams ? filterParams.searchString : null));
  return contactDataFilterParams;
};

async function getContactDetails(filterParams={
  pgOffset: 0,
  pgSize: 0,
}) {
  let {pgOffset, pgSize, searchString} = filterParams
  const { status, permissions } = await Contacts.requestPermissionsAsync();
  if (status === "granted") {
    const { data } = await Contacts.getContactsAsync(
      await getContactParams(filterParams)
    );
    if (data.length > 0) {
      const contacts = data;
      return {
        'status': true,
        'data': contacts
      };
    } else {
      return {
        'status': true,
        'data': []
      };
    }
  } else {
    return null;
  }
}

function* getContactListWorker({
  payload: {pageOffset, pageSize, searchString, isJoinContactList, fetchingContactlogsCompleted},
}) {
  try {
    !searchString && (yield put(showLoader('Loading...')));
    /*
      In case of an api: Below commented code would have been executed.
      Note: Below code is just added to give an overview in case of a api call.
    */
    /* const {response, error} = yield call(contactListApi.getContactList, {
      // Pass data in the api
      pageOffset, pageSize, searchString
    });
    */
    let response =  yield call(getContactDetails, {
      pageOffset,
      pageSize,
      searchString
    });
    if (response) {
      if (response.status) {
        yield put(
          setContactList({
            contactListData: response.data,
            isJoinContactList: isJoinContactList
          }),
        );
        if (!!fetchingContactlogsCompleted) {
          yield call(
            fetchingContactlogsCompleted,
            response.data.length,
          );
        }
      } else {
        yield put(showErrorPopup({errorText: response.statusMsg}));
      }
    } else {
      let errorText = 'Permission denied to access the contacts. Cant proceed ahead.';
      yield put(showErrorPopup({errorText}));
    }
    yield put(hideLoader());
  } catch (error) {
    yield put(hideLoader());
    yield put(showErrorPopup({errorText: 'Failed to fetch contact details.'}));
  }
}

function* watchContactList() {
  yield takeEvery(REQUEST_CONTACT_LIST, getContactListWorker);
}

export const sagas = [
  watchContactList,
];
