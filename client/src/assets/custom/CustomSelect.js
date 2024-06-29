import React from "react";
import { Select, MenuItem, OutlinedInput } from "@mui/material";
import { styled } from "@mui/system";

const CustomArrowIcon = (props) => (
  <svg
    width="12"
    height="8"
    viewBox="0 0 12 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.77295 7.0625C6.0249 7.0625 6.2417 6.96289 6.43506 6.76953L10.8237 2.26953C10.9761 2.11719 11.0581 1.92969 11.0581 1.70703C11.0581 1.25 10.6948 0.886719 10.2437 0.886719C10.021 0.886719 9.81006 0.974609 9.646 1.13867L5.77881 5.12305L1.90576 1.13867C1.7417 0.980469 1.53662 0.886719 1.30811 0.886719C0.856934 0.886719 0.493652 1.25 0.493652 1.70703C0.493652 1.92969 0.575684 2.11719 0.728027 2.27539L5.1167 6.76953C5.32178 6.96875 5.52686 7.0625 5.77295 7.0625Z"
      fill="#69788C"
    />
  </svg>
);

const StyledSelect = styled(Select)(({ theme }) => ({
  marginLeft: "8px",
  marginRight: "2px",
  "& .MuiSelect-select": {
    padding: "4px 12px",
    paddingRight: "32px",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  "& .MuiSelect-icon": {
    top: "50%",
    transform: "translateY(-50%)",
    right: "8px",
    position: "absolute",
  },
  "&.MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#CFDCE5",
      borderWidth: "1.5px",
    },
    "&:hover fieldset": {
      borderColor: "#CFDCE5",
      borderWidth: "1.5px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#CFDCE5",
      borderWidth: "1.5px",
    },
  },
}));

const CustomSelect = ({ value, onChange, rowsPerPageOptions }) => (
  <StyledSelect
    value={value}
    onChange={onChange}
    input={<OutlinedInput notched={false} label="" />}
    IconComponent={CustomArrowIcon}
    variant="outlined"
    size="small"
  >
    {rowsPerPageOptions.map((rows) => (
      <MenuItem key={rows} value={rows}>
        {rows}
      </MenuItem>
    ))}
  </StyledSelect>
);

export default CustomSelect;
