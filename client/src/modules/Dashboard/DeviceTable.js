import React, { useState, useEffect } from "react";
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
  Typography,
  Box,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { styled } from "@mui/system";
import FilterIcon from "../../assets/icons/filterIcon";
import SearchIcon from "../../assets/icons/searchIcon";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import {
  getDeviceStatusColor,
  getDownloadStatusFrequency,
} from "../utils/dashboardUtils";
import CustomSelect from "../../assets/custom/CustomSelect";

const DeviceTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [appliances, setAppliances] = useState([]);
  const downloadStatusOverallFrequency =
    appliances && getDownloadStatusFrequency(appliances);

  useEffect(() => {
    async function fetchAppliances() {
      try {
        const response = await fetch("http://localhost:5000/api/v1/appliances");
        const data = await response.json();
        setAppliances(data);
      } catch (error) {
        console.debug("[Error] error fetching appliances data", error);
      }
    }

    fetchAppliances();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getDownloadStatusColor = (status) => {
    switch (status) {
      case "Failed":
      case "Stalled":
      case "Archived":
        return "#CF1322";
      case "Cancelled":
        return "#F0A203";
      case "Downloading":
      case "Unarchiving":
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
    <Box display="flex" alignItems="center">
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
    "&:hover": {
      backgroundColor: "#DDE3E7", // One shade darker than #E6ECF0
      borderColor: "#DDE3E7",
    },
    "&:active": {
      color: "#1C4B8E", // Active text color
      borderColor: "#1C4B8E", // Active border color
    },
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

  const CustomPagination = () => {
    const pageCount = Math.ceil(appliances.length / rowsPerPage);

    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ flexGrow: 1 }}
      >
        <Typography
          style={{
            fontSize: "12px",
            color: "#69788C",
            fontWeight: 500,
            lineHeight: "20px",
            letterSpacing: "-0.2px",
            textAlign: "Right",
          }}
        >
          Show
        </Typography>
        <CustomSelect
          value={rowsPerPage}
          onChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 25, 50]}
          width="69.58px"
          height="32px"
          gap="4px"
        />
        <IconButton
          onClick={(e) => handleChangePage(e, page - 1)}
          disabled={page === 0}
        >
          <KeyboardArrowLeft />
        </IconButton>
        {[...Array(pageCount).keys()].map((pageNum) => (
          <Button
            key={pageNum}
            onClick={(e) => handleChangePage(e, pageNum)}
            variant={pageNum === page ? "contained" : "text"}
            sx={{
              minWidth: "32px",
              padding: "4px 8px",
              borderRadius: "8px",
              backgroundColor: pageNum === page ? "#E6F0FF" : "transparent",
              color: pageNum === page ? "#084782" : "#2D3540",
              border: pageNum === page ? "1px solid #084782" : "none",
              "&:hover": {
                backgroundColor: pageNum === page ? "#E6F0FF" : "transparent",
              },
              fontFamily: "Commissioner",
              fontSize: "12px",
              fontWeight: "500",
              lineHeight: "20px",
              letterSpacing: "-0.2px",
              textAlign: "center",
              background: pageNum === page ? "#E6F0FF" : "transparent",
            }}
          >
            {pageNum + 1}
          </Button>
        ))}
        <IconButton
          onClick={(e) => handleChangePage(e, page + 1)}
          disabled={page >= pageCount - 1}
        >
          <KeyboardArrowRight />
        </IconButton>
      </Box>
    );
  };

  return (
    <>
      <div style={{ height: "72px", backgroundColor: "white" }}>
        <div
          className="device-table-title"
          style={{
            position: "relative",
            height: "40px",
            padding: "16px 24px",
          }}
        >
          <div
            style={{
              fontFamily: "Commissioner",
              fontSize: "28px",
              fontWeight: 500,
              lineHeight: "40px",
              letterSpacing: "-0.2px",
              textAlign: "left",
            }}
          >
            Devices
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "16px",
          flexDirection: "column",
          padding: "24px",
          // height: "100%", // Removed to prevent enforcing a fixed height
          overflowX: "auto", // Ensure horizontal scrolling is enabled if content exceeds width
        }}
      >
        <div
          style={{
            padding: "16px 24px 16px 24px",
            height: "24px",
            gap: "4px",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            flexWrap="wrap"
            backgroundColor="#fff"
            borderRadius="8px"
            gap="16px"
            mb={2}
            pt={2}
            pr={3}
            pb={2}
            pl={3}
          >
            {downloadStatusOverallFrequency &&
              [...downloadStatusOverallFrequency].map(([key, value]) => (
                <StatusLabel
                  key={key}
                  label={`${value} ${key}`}
                  color={getDownloadStatusColor(key)}
                />
              ))}
          </Box>
        </div>
        <Box p={3}>
          <TableContainer
            component={Paper}
            style={{
              boxShadow: "0px 2px 2px 0px #0426520F",
              borderRadius: "8px",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              pt={2}
              pb={2}
              alignItems="center"
              style={{ padding: "16px", height: "32px" }}
            >
              <Box display="flex" alignItems="center" style={{ gap: "16px" }}>
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
                        borderWidth: "1.5px",
                      },
                      "&:hover fieldset": {
                        borderColor: "#CFDCE5",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#CFDCE5",
                        borderRadius: "4px",
                        borderWidth: "1.5px",
                      },
                      "& input::placeholder": {
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        letterSpacing: "-0.2px",
                        textAlign: "left",
                        color: "#69788C !important",
                        opacity: 1,
                      },
                      "& input": {
                        padding: "4.5px 8px",
                        color: "#69788C !important",
                      },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                <FilterIcon />
              </Box>

              <CustomPagination />
            </Box>
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
                {appliances
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((device) => (
                    <TableRow key={device?.serialNo}>
                      <StyledTableCell>{device?.serialNo}</StyledTableCell>
                      <TableCell style={{ borderBottom: "none" }}>
                        <StyledTypography>
                          {device?.theatreName}
                        </StyledTypography>
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
                            color={getDeviceStatusColor(device.deviceStatus)}
                          />
                          <StyledTypography style={{ color: "#084782" }} ml={1}>
                            {device.deviceStatus}
                          </StyledTypography>
                        </Box>
                      </TableCell>
                      <TableCell style={{ borderBottom: "none" }}>
                        <Box display="flex" alignItems="center">
                          <StatusCircle
                            color={getDownloadStatusColor(
                              device.downloadStatus
                            )}
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
      </div>
    </>
  );
};

export default DeviceTable;
