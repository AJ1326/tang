import passwordValidator from 'password-validator';

const passwordValidation = password => {
  const schema = new passwordValidator();
  schema
    .is()
    .min(8)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits()
    .has()
    .symbols();

  let isValid = schema.validate(password);
  let invalidCriterias = schema.validate(password, {
    list: true,
  });

  return {
    isValid,
    invalidCriterias,
  };
};

export default passwordValidation;
