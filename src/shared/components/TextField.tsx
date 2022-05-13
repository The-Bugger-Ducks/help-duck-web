import React from 'react';
interface Props {
  backgroundColor?: string;
  color?: string;
  height?: string;
  border?: string;
  type?: any;
  name?: string;
  placeholder?: string;
  radius?: string;
  width?: string;
  required?: boolean;
  padding?: string;
  onChange?: (event: any) => void;
  disabled?: boolean;
}

const TextInput: React.FC<Props> = ({
  backgroundColor = '#F2F2F3',
  color = '#495057',
  height = '50px',
  border = '1px solid #CED4DA',
  type = 'email',
  name = '',
  placeholder = '',
  radius = '0.3rem',
  width = '100%',
  required = true,
  padding = '0.5rem',
  onChange,
  disabled = false,
}) => {
  return (
    <input
      onChange={onChange}
      style={{
        backgroundColor: backgroundColor,
        border,
        borderRadius: radius,
        width,
        padding,
        height,
        fontSize: '16px',
        color,
      }}
      className="input-primary"
      type={type}
      name={name}
      required={required}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

export default TextInput;
