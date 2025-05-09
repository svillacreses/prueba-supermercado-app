import { TextField } from "@mui/material";

interface CustomTextFieldProps {
  label: string;
  type?: string;
  name?: string;
  required?: boolean;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CustomTextField({
  label,
  type = "text",
  name,
  required = false,
  value,
  onChange,
}: CustomTextFieldProps) {
  return (
    <TextField
      fullWidth
      name={name}
      margin="dense"
      variant="outlined"
      required={required}
      label={label}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
}
