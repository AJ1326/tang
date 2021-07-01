import * as ApplicationActions from '../actions/applicationAction';

export default (state = {}, {payload, type}) => {
  switch (type) {
    case ApplicationActions.VERSION_RECIEVED:
      return {
        ...state,
        versionData: payload,
      };
    default:
      return state;
  }
};
