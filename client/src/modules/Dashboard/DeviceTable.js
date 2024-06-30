import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  CustomButton,
  StyledTypography,
  StyledTableCell,
  TitleContainer,
  Title,
  StatusContainer,
  FilterContainer,
  StatusBox,
  PaginationContainer,
  SearchContainer,
  TableWrapper,
  StyledTextField,
} from "./styles/styles";

import FilterIcon from "../../assets/icons/FilterIcon";
import SearchIcon from "../../assets/icons/SearchIcon";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import {
  getDeviceStatusColor,
  getDownloadStatusFrequency,
} from "../utils/dashboardUtils";
import CustomSelect from "../../assets/custom/CustomSelect";

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
      sx={{ fontSize: "14px", color: "#2D3540", lineHeight: "24px" }}
    >
      {label}
    </Typography>
  </Box>
);

const CustomPagination = ({
  appliances,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const pageCount = Math.ceil(appliances.length / rowsPerPage);

  return (
    <PaginationContainer>
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
    </PaginationContainer>
  );
};

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
        const appliances = data.appliances
        setAppliances(appliances);
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

  return (
    <>
      <TitleContainer>
        <Title>Devices</Title>
      </TitleContainer>
      <StatusContainer>
        <FilterContainer>
          <StatusBox>
            {downloadStatusOverallFrequency &&
              [...downloadStatusOverallFrequency].map(([key, value]) => (
                <StatusLabel
                  key={key}
                  label={`${value} ${key}`}
                  color={getDownloadStatusColor(key)}
                />
              ))}
          </StatusBox>
        </FilterContainer>
        <Box p={3}>
          <TableContainer component={TableWrapper}>
            <SearchContainer>
              <Box display="flex" alignItems="center" sx={{ gap: "16px" }}>
                <StyledTextField
                  variant="outlined"
                  size="small"
                  placeholder="Search"
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
              <CustomPagination
                appliances={appliances}
                rowsPerPage={rowsPerPage}
                page={page}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </SearchContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ borderBottom: "1.5px solid #E6ECF0" }}>
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
                          sx={{ color: "#084782" }}
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
                          sx={{ color: "#69788C" }}
                        >
                          {device.avgBandwidth}
                        </StyledTypography>
                      </TableCell>
                      <TableCell style={{ borderBottom: "none" }}>
                        <Box display="flex" alignItems="center">
                          <StatusCircle
                            color={getDeviceStatusColor(device.deviceStatus)}
                          />
                          <StyledTypography sx={{ color: "#084782" }} ml={1}>
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
                          <StyledTypography sx={{ color: "#084782" }} ml={1}>
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
      </StatusContainer>
    </>
  );
};

export default DeviceTable;
