import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import "./FutureDatePicker.css";
import { TextField, Box } from "@mui/material";
import { format } from "date-fns";
import { tr } from "date-fns/locale"; // Türkçe yerel ayar

const FutureDatePicker = ({ label, onChange, sx = { mt: "30px" } }) => {
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (date) => {
    setStartDate(date);
    if (onChange) onChange(date);
  };

  return (
    <Box sx={sx} display="flex" flexDirection="column">
      <label style={{ display: "block", marginBottom: "10px" }}>{label}</label>
      <DatePicker
        selected={startDate}
        onChange={handleChange}
        minDate={new Date()}
        locale={tr}
        customInput={
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Tarih ve saat seçin"
            value={startDate ? format(startDate, "dd/MM/yyyy HH:mm") : ""}
            InputProps={{
              readOnly: true,
            }}
            sx={{ mt: 1 }}
          />
        }
        dateFormat="dd/MM/yyyy HH:mm"
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Saat"
      />
    </Box>
  );
};

export default FutureDatePicker;
