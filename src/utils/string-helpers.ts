const StringHelpers = {
  validatePasswordComplexity: (pwd: string): boolean => {
    const regEx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return regEx.test(pwd);
  },
};

export { StringHelpers };
