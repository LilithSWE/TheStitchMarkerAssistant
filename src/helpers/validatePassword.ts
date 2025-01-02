export const validatePassword = (password: string) => {
  if (password.length > 5) {
    return true;
  }
  return false;
};
