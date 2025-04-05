// src/components/Form.tsx

import React from "react";
import InputField from "./InputField";  // Reusable input component
import Button from "./Button";  // Reusable button component

interface FormProps {
  username: string;
  password: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
  error: string | null;
  formError: string | null;
}

const Form: React.FC<FormProps> = ({
  username,
  password,
  setUsername,
  setPassword,
  handleSubmit,
  error,
  formError
}) => {
  return (
    <div>
      <h2>Login</h2>
      {/* Display any form or login errors */}
      {formError && <div className="error">{formError}</div>}
      {error && <div className="error">{error}</div>}  

      {/* Form that triggers the handleSubmit function */}
      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}  // Update username on change
        />
        <InputField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}  // Update password on change
        />
        
        {/* Submit button */}
        <Button type="submit" label="Login and Join Session" />
      </form>
    </div>
  );
};

export default Form;
