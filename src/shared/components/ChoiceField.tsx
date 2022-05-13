import React from 'react';
interface Props {
  backgroundColor?: string;
  color?: string;
  border?: string;
  name?: string;
  radius?: string;
  width?: string;
  height?: string;
  required?: boolean;
  padding?: string;
  onChange?: (event: any) => void;
  items: Array<{ value: string; label: string; selected?: boolean }>;
  disabled?: boolean;
}

const SelectInput: React.FC<Props> = ({
  backgroundColor = '#F2F2F3',
  color = '#495057',
  border = '1px solid #CED4DA',
  name = '',
  radius = '0.3rem',
  width = '100%',
  height = '50px',
  required = true,
  padding = '0.5rem',
  onChange,
  items,
  disabled = false,
}) => {
  return (
    <div>
      <select
        onChange={onChange}
        style={{
          backgroundColor: backgroundColor,
          border,
          borderRadius: radius,
          width,
          padding: `${padding} 0.5rem`,
          height,
          fontSize: '16px',
          color,
        }}
        className="input-primary"
        name={name}
        required={required}
        disabled={disabled}
      >
        <option value="" selected>
          Selecione uma opção
        </option>
        {items.map((item, index) => (
          <option key={index} value={item.value} selected={item.selected}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
