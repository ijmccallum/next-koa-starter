// ?@??.?? <- email will be at least that
const emailValidator = (email: string) => {
  return /(.+)@(.+){2,}\.(.+){2,}/.test(email);
};

export default emailValidator;
