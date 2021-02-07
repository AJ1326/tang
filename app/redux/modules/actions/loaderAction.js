export const SHOW_LOADER = 'loader/showLoader';
export const HIDE_LOADER = 'loader/hideLoader';

export const showLoader = (payload = '') => ({
  type: SHOW_LOADER,
  payload,
});

export const hideLoader = (payload = {}) => ({
  type: HIDE_LOADER,
  payload,
});
