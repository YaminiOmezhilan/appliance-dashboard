// src/DeviceTable.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  Typography,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/system";
import { dummyDevices } from "./utils";
import FilterIcon from "../../assests/icons/filterIcon";
import SearchIcon from "@mui/icons-material/Search"; // Ensure this is the correct icon import

const DeviceTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Failed":
        return "#CF1322";
      case "Cancelled":
        return "#F0A203";
      case "Downloading":
        return "#1D81E3";
      case "Scheduled":
        return "#B2B2B2";
      default:
        return "#0D7C2D";
    }
  };

  const StatusCircle = ({ color }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
    >
      <path
        d="M5 0H3C1.34315 0 0 1.34315 0 3V5C0 6.65685 1.34315 8 3 8H5C6.65685 8 8 6.65685 8 5V3C8 1.34315 6.65685 0 5 0Z"
        fill={color}
      />
    </svg>
  );

  const StatusLabel = ({ label, color }) => (
    <Box display="flex" alignItems="center" mr={2} pt={2} pr={3} pb={2} pl={3}>
      <StatusCircle color={color} />
      <Typography
        ml={1}
        style={{ fontSize: "14px", color: "#2D3540", lineHeight: "24px" }}
      >
        {label}
      </Typography>
    </Box>
  );

  const CustomButton = styled(Button)({
    textTransform: "none",
    fontSize: "0.875rem",
    fontWeight: "500",
    padding: "6px 8px",
    lineHeight: 1.5,
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#E6ECF0",
    borderColor: "#d9d9d9",
    color: "#2D3540",
  });

  const StyledTypography = styled(Typography)`
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
  `;

  const StyledTableCell = styled(TableCell)`
    border-bottom: none;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
  `;

  return (
    <Box p={3}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontSize: "28px", fontWeight: 500, lineHeight: "40px" }}
      >
        Devices
      </Typography>

      <Box display="flex" mb={2} alignItems="center">
        <StatusLabel label="1 Failed" color="#CF1322" />
        <StatusLabel label="1 Cancelled" color="#F0A203" />
        <StatusLabel label="1 Scheduled" color="#B2B2B2" />
        <StatusLabel label="14 Downloading" color="#1D81E3" />
        <StatusLabel label="32 Downloaded" color="#0D7C2D" />
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center" mb={2} style={{ gap: "16px" }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search"
            sx={{
              width: "240px",
              height: "32px",
              borderRadius: "4px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#CFDCE5",
                  borderRadius: "4px",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#CFDCE5",
                },
                "& input::placeholder": {
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  letterSpacing: "-0.2px",
                  textAlign: "left",
                  color: "#000", // Placeholder text color
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon style={{ color: "#7D8A99" }} />
                </InputAdornment>
              ),
            }}
          />
          <FilterIcon />
        </Box>

        <TablePagination
          component="div"
          count={dummyDevices.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 25, 50]}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow
              style={{
                borderBottom: "1.5px solid #E6ECF0",
              }}
            >
              <TableCell>Device Serial</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Bandwidth</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Download Status</TableCell>
              <TableCell>OS Version</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyDevices
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((device) => (
                <TableRow key={device.serialNo}>
                  <StyledTableCell>{device.serialNo}</StyledTableCell>
                  <TableCell style={{ borderBottom: "none" }}>
                    <StyledTypography>{device.theatreName}</StyledTypography>
                    <StyledTypography
                      style={{ color: "#084782" }}
                      variant="body2"
                      color="textSecondary"
                    >
                      {device.location.city}, {device.location.state},{" "}
                      {device.location.country}
                    </StyledTypography>
                  </TableCell>
                  <TableCell style={{ borderBottom: "none" }}>
                    <StyledTypography>{device.bandwidth}</StyledTypography>
                    <StyledTypography
                      variant="body2"
                      style={{ color: "#69788C" }}
                    >
                      {device.avgBandwidth}
                    </StyledTypography>
                  </TableCell>
                  <TableCell style={{ borderBottom: "none" }}>
                    <Box display="flex" alignItems="center">
                      <StatusCircle
                        color={getStatusColor(device.deviceStatus)}
                      />
                      <StyledTypography style={{ color: "#084782" }} ml={1}>
                        {device.deviceStatus}
                      </StyledTypography>
                    </Box>
                  </TableCell>
                  <TableCell style={{ borderBottom: "none" }}>
                    <Box display="flex" alignItems="center">
                      <StatusCircle
                        color={getStatusColor(device.downloadStatus)}
                      />
                      <StyledTypography style={{ color: "#084782" }} ml={1}>
                        {device.downloadStatus}
                      </StyledTypography>
                    </Box>
                  </TableCell>
                  <StyledTableCell>{device.osVersion}</StyledTableCell>
                  <TableCell style={{ borderBottom: "none" }}>
                    <CustomButton
                      component={Link}
                      to={`/device/${device.serialNo}`}
                      variant="outlined"
                    >
                      View
                    </CustomButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DeviceTable;
