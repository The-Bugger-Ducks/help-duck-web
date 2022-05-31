import React from 'react';
interface Props {
  disabled?: boolean;
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
  items:
    | Array<{ value: string; label: string; selected?: boolean }>
    | undefined;
}

const SelectInput: React.FC<Props> = ({
  disabled = false,
  backgroundColor = !disabled ? "#FAFAFA" : "#EDEDEE",
  border = "1px solid #CED4DA",
  name = "",
  radius = "0.3rem",
  width = "100%",
  color = '#495057',
  height = '50px',
  required = true,
  padding = '0.5rem',
  onChange,
  items,
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
        {items != undefined &&
          items.map((item, index) => (
            <option key={index} value={item.value} selected={item.selected}>
              {item.label}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SelectInput;
