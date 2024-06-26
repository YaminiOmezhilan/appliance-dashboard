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
  IconButton,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { styled } from "@mui/system";
import { dummyDevices } from "./utils";

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
      case "Offline":
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
    fontWeight: "550",
    padding: "6px 8px",
    lineHeight: 1.5,
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#E6ECF0",
    borderColor: "#d9d9d9",
    color: "#2D3540",
  });

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

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <TextField variant="outlined" size="small" placeholder="Search" />
        <IconButton>
          <FilterListIcon />
        </IconButton>
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
            <TableRow style={{ borderBottom: "2px solid #CFDCE5" }}>
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
                  <TableCell style={{ borderBottom: "none" }}>
                    {device.serialNo}
                  </TableCell>
                  <TableCell style={{ borderBottom: "none" }}>
                    <Typography>{device.theatreName}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {device.location.city}, {device.location.state},{" "}
                      {device.location.country}
                    </Typography>
                  </TableCell>
                  <TableCell style={{ borderBottom: "none" }}>
                    <Typography>{device.bandwidth}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {device.avgBandwidth}
                    </Typography>
                  </TableCell>
                  <TableCell style={{ borderBottom: "none" }}>
                    <Box display="flex" alignItems="center">
                      <StatusCircle
                        color={getStatusColor(device.deviceStatus)}
                      />
                      <Typography ml={1}>{device.deviceStatus}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell style={{ borderBottom: "none" }}>
                    <Box display="flex" alignItems="center">
                      <StatusCircle
                        color={getStatusColor(device.downloadStatus)}
                      />
                      <Typography ml={1}>{device.downloadStatus}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell style={{ borderBottom: "none" }}>
                    {device.osVersion}
                  </TableCell>
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
