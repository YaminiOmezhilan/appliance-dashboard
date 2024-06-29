import React, { useState, useEffect } from "react";
import {
  TabStyle,
  RootDiv,
  BreadcrumbDiv,
  StyledBreadcrumbs,
  StyledLink,
  StyledContainer,
  FlexBox,
  InlineTypography,
  IconBox,
  DetailsBox,
  BottomBorderBox,
  CardContainer,
  StyledCard,
  StyledCardContent,
  StyledGrid,
} from "./styles/styles";

import { Grid, Typography, Chip, Box as MuiBox } from "@mui/material";
import SpeedTestIcon from "../../assets/icons/SpeedTestIcon";
import LogsIcon from "../../assets/icons/LogIcon";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import StatusIcon from "../../assets/icons/StatusIcon";
import PieChartIcon from "../../assets/icons/PieChartIcon";
import {
  getDeviceStatusColor,
  convertToApplianceDetailsPageFormat,
} from "../utils/dashboardUtils";
import { useParams } from "react-router-dom";

const DeviceDetail = () => {
  const { serialNo } = useParams();
  const [appliance, setAppliance] = useState(null);
  const applianceInfo = appliance
    ? convertToApplianceDetailsPageFormat(appliance)
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

  return (
    <>
      <RootDiv>
        <BreadcrumbDiv>
          <StyledBreadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <StyledLink color="inherit" href="/">
              Devices
            </StyledLink>
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
          </StyledBreadcrumbs>
        </BreadcrumbDiv>
      </RootDiv>
      <StyledContainer>
        <FlexBox>
          <InlineTypography variant="h4">
            {applianceInfo ? applianceInfo["Device Serial"] : undefined}
          </InlineTypography>
          <IconBox>
            <SpeedTestIcon />
            <LogsIcon />
          </IconBox>
        </FlexBox>
        <MuiBox>
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

          <DetailsBox>
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
          </DetailsBox>
        </MuiBox>

        <BottomBorderBox></BottomBorderBox>

        <MuiBox display="flex" alignItems="center">
          <TabStyle variant="body1">Details</TabStyle>
          <TabStyle variant="body1">Content</TabStyle>
          <TabStyle variant="body1">Bandwidth</TabStyle>
        </MuiBox>
      </StyledContainer>
      <CardContainer>
        <StyledCard>
          <StyledCardContent>
            {applianceInfo && (
              <StyledGrid container spacing={3}>
                {Object.entries(applianceInfo).map(([key, value]) => (
                  <Grid item xs={12} sm={6} md={3} key={key}>
                    <MuiBox display="flex" flexDirection="column">
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
                    </MuiBox>
                  </Grid>
                ))}
              </StyledGrid>
            )}
          </StyledCardContent>
        </StyledCard>
      </CardContainer>
    </>
  );
};

export default DeviceDetail;
