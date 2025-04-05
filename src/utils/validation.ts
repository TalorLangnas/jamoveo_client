export const validateForm = (username: string, password: string, instrument: string): boolean => {
    return username.trim() !== "" && password.trim() !== "" && instrument.trim() !== "";
  };
  