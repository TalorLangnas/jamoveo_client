// src/components/InputField.tsx
import React from "react";
import "../assets/styles/components/InputField.css";

interface InputFieldProps {
  type: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  label,
  value,
  onChange,
}) => {
  return (
    <div className="input-field">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        required
      />
      <label>{label}</label>
    </div>
  );
};

export default InputField;
