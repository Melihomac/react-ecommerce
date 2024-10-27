import { TextField } from "@mui/material";
import React, { useState } from "react";

const TextFieldComponent = ({
  fullWidth,
  label,
  defaultValue,
  onChange,
  uzunluk,
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const capitalizedValue =
      inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    setValue(capitalizedValue);
    onChange(e);
  };

  return (
    <>
      <TextField
        fullWidth={fullWidth}
        label={label}
        value={value}
        onChange={handleChange}
        variant="outlined"
        sx={{ mt: "30px", width: "45%", mr: "30px" }}
        inputProps={{ maxLength: uzunluk }}
      />
    </>
  );
};

export default TextFieldComponent;
