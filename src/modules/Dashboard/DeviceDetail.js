// src/DeviceDetails.js
import React from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Chip,
  Box,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { styled } from "@mui/system";
import SpeedTestIcon from "../../assests/icons/speedTestIcon";
import LogsIcon from "../../assests/icons/logsIcon";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import StatusIcon from "../../assests/icons/statusIcon";
import PieChartIcon from "../../assests/icons/piechartIcon";
import { data } from "./utils";

const DeviceDetail = () => {
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

  const TabStyle = styled(Typography)({
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "-0.2px",
    color: "#69788C",
    padding: "8px 12px 8px 12px",
  });

  return (
    <>
      <Container
        sx={{
          padding: "0px 24px",
        }}
      >
        <Box mt={3} mb={2}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ color: "#69788C" }}
          >
            <Link
              color="inherit"
              href="/"
              sx={{
                textDecoration: "none",
                fontSize: "12px",
                fontWeight: 500,
                lineHeight: "20px",
                letterSpacing: "-0.2px",
                textAlign: "left",
                color: "#69788C",
                paddingTop: "6px",
                paddingBottom: "6px",
              }}
            >
              Devices
            </Link>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 400,
                lineHeight: "20px",
                letterSpacing: "-0.2px",
                textAlign: "left",
                color: "#2D3540",
              }}
            >
              JTD-912312
            </Typography>
          </Breadcrumbs>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography
            variant="h4"
            sx={{
              fontSize: "28px",
              fontWeight: 400,
              lineHeight: "40px",
              letterSpacing: "-0.2px",
              textAlign: "left",
              color: "#2D3540",
              display: "inline-block",
            }}
          >
            JTD-912312
          </Typography>{" "}
          <Box
            display="flex"
            alignItems="center"
            mb={2}
            style={{ gap: "16px" }}
          >
            <SpeedTestIcon />
            <LogsIcon />
          </Box>
        </Box>
        <Box>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "24px",
              letterSpacing: "-0.2px",
              textAlign: "left",
              color: "#2D3540",
            }}
          >
            Cross River Mall
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              fontSize: "12px",
              fontWeight: 400,
              lineHeight: "20px",
              letterSpacing: "-0.2px",
              textAlign: "left",
              color: "#69788C",
            }}
          >
            New Delhi, Delhi, India
          </Typography>

          <Box mt={1} mb={1} display="flex" alignItems="center" gap={1}>
            <Chip
              icon={<StatusIcon color={getStatusColor("Online")} />}
              label={"Online"}
              sx={{
                backgroundColor: "#E6ECF0",
                color: "#2D3540",
                fontSize: "12px",
                fontWeight: 500,
                lineHeight: "20px",
                letterSpacing: "-0.2px",
                textAlign: "center",
                paddingLeft: "5px",
                height: "auto",
              }}
            />
            <Chip
              icon={<PieChartIcon />}
              label={"828 GB"}
              sx={{
                backgroundColor: "#E6ECF0",
                color: "#2D3540",
                fontSize: "12px",
                fontWeight: 500,
                lineHeight: "20px",
                letterSpacing: "-0.2px",
                textAlign: "center",
                paddingLeft: "5px",
                height: "auto",
              }}
            />
          </Box>
        </Box>

        <Box
          style={{
            borderBottom: "2px solid #F5F8FA",
          }}
        ></Box>

        <Box display="flex" alignItems="center">
          <TabStyle variant="body1">Details</TabStyle>
          <TabStyle variant="body1">Content</TabStyle>
          <TabStyle variant="body1">Bandwidth</TabStyle>
        </Box>
      </Container>
      <Container
        sx={{
          padding: "24px",
        }}
      >
        <Card
          sx={{
            padding: "0px",
          }}
        >
          <CardContent sx={{ padding: 0 }}>
            <Grid container spacing={3} sx={{ pt: 3, pl: 3, pr: 3 }}>
              {data.map((item, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Box display="flex" flexDirection="column">
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#2D3540",
                        fontSize: "12px",
                        fontWeight: 500,
                        lineHeight: "20px",
                        letterSpacing: "-0.2px",
                      }}
                    >
                      {item.label}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        letterSpacing: "-0.2px",
                        textAlign: "left",
                        color: "#2D3540",
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default DeviceDetail;
