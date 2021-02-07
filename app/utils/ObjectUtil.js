export const isNotEmpty = value => {
  return !isEmpty(value);
};

export const isEmpty = value => {
  return value === undefined || value === null || value === '';
};
