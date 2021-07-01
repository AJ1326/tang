export const VERSION_RECIEVED = 'application/versionReceived';

export const versionReceieved = (payload = {}) => ({
  type: VERSION_RECIEVED,
  payload,
});
