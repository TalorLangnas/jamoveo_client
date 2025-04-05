// Validation function for signup form
export const validateForm = (username: string, password: string, instrument: string): boolean => {
    return username.trim() !== "" && password.trim() !== "" && instrument.trim() !== "";
  };

// Validation function for the login form
export const validateLoginForm = (username: string, password: string): boolean => {
  return username.trim() !== "" && password.trim() !== "";
};
  