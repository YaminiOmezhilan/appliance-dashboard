import React, { useState, useEffect } from "react";
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
import SpeedTestIcon from "../../assets/icons/speedTestIcon";
import LogsIcon from "../../assets/icons/logsIcon";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import StatusIcon from "../../assets/icons/statusIcon";
import PieChartIcon from "../../assets/icons/piechartIcon";
import {
  getDeviceStatusColor,
  convertToApplianceDetailsPageFormatFormat,
} from "../utils/dashboardUtils";
import { useParams } from "react-router-dom";

const DeviceDetail = () => {
  const { serialNo } = useParams();
  const [appliance, setAppliance] = useState(null);
  const applianceInfo = appliance
    ? convertToApplianceDetailsPageFormatFormat(appliance)
    : undefined;
  useEffect(() => {
    const fetchAppliance = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/appliance/${serialNo}/info`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAppliance(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchAppliance();
  }, [serialNo]);

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
      <div style={{ height: "48px", width: "100%" }}>
        <div
          style={{
            position: "absolute",
            padding: "11px 32px",
            boxSizing: "border-box",
          }}
        >
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
                lineHeight: "27px",
                letterSpacing: "-0.2px",
                textAlign: "left",
                color: "#69788C",
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
              {applianceInfo ? applianceInfo["Device Serial"] : undefined}
            </Typography>
          </Breadcrumbs>
        </div>
      </div>
      <Container
        sx={{
          padding: "0px 24px",
        }}
        style={{
          backgroundColor: "#FFFFFF",
          height: "192px",
          padding: "12px 24px 0px 24px",
        }}
      >
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
            {applianceInfo ? applianceInfo["Device Serial"] : undefined}
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
            {applianceInfo ? applianceInfo["Location"] : undefined}
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
            {applianceInfo ? applianceInfo["City"] : undefined}
          </Typography>

          <Box mt={1} mb={1} display="flex" alignItems="center" gap={1}>
            <Chip
              icon={
                <StatusIcon
                  color={getDeviceStatusColor(
                    appliance ? appliance["deviceStatus"] : "Online"
                  )}
                />
              }
              label={appliance ? appliance["deviceStatus"] : "Online"}
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
              label={
                applianceInfo ? applianceInfo["Storage Available"] : undefined
              }
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
            boxShadow: "0px 2px 2px 0px #0426520F",
            borderRadius: "8px",
          }}
        >
          <CardContent sx={{ padding: 0 }}>
            {applianceInfo && (
              <Grid container spacing={3} sx={{ pt: 3, pl: 3, pr: 3 }}>
                {Object.entries(applianceInfo).map(([key, value]) => (
                  <Grid item xs={12} sm={6} md={3} key={key}>
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
                        {key}
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
                        {typeof value === "object"
                          ? JSON.stringify(value)
                          : value}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            )}
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default DeviceDetail;
