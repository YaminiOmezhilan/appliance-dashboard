import { styled } from "@mui/system";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Breadcrumbs,
  Link,
  Box as MuiBox,
  TableCell,
  Paper,
  Button,
  Box,
  TextField,
} from "@mui/material";

export const TabStyle = styled(Typography)({
  fontSize: "14px",
  fontWeight: 500,
  lineHeight: "24px",
  letterSpacing: "-0.2px",
  color: "#69788C",
  padding: "8px 12px",
});

export const RootDiv = styled("div")({
  height: "48px",
  width: "100%",
});

export const BreadcrumbDiv = styled("div")({
  position: "absolute",
  padding: "11px 32px",
  boxSizing: "border-box",
});

export const StyledBreadcrumbs = styled(Breadcrumbs)({
  color: "#69788C",
});

export const StyledLink = styled(Link)({
  textDecoration: "none",
  fontSize: "12px",
  fontWeight: 500,
  lineHeight: "27px",
  letterSpacing: "-0.2px",
  textAlign: "left",
  color: "#69788C",
});

export const StyledContainer = styled(Container)({
  backgroundColor: "#FFFFFF",
  height: "192px",
  padding: "12px 24px 0px 24px",
});

export const FlexBox = styled(MuiBox)({
  display: "flex",
  justifyContent: "space-between",
});

export const InlineTypography = styled(Typography)({
  fontSize: "28px",
  fontWeight: 400,
  lineHeight: "40px",
  letterSpacing: "-0.2px",
  textAlign: "left",
  color: "#2D3540",
  display: "inline-block",
});

export const IconBox = styled(MuiBox)({
  display: "flex",
  alignItems: "center",
  marginBottom: "16px",
  gap: "16px",
});

export const DetailsBox = styled(MuiBox)({
  marginTop: "8px",
  marginBottom: "8px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

export const BottomBorderBox = styled(MuiBox)({
  borderBottom: "2px solid #F5F8FA",
});

export const CardContainer = styled(Container)({
  padding: "24px",
});

export const StyledCard = styled(Card)({
  padding: "0px",
  boxShadow: "0px 2px 2px 0px #0426520F",
  borderRadius: "8px",
});

export const StyledCardContent = styled(CardContent)({
  padding: 0,
});

export const StyledGrid = styled(Grid)({
  paddingTop: "24px",
  paddingLeft: "24px",
  paddingRight: "24px",
});

export const CustomButton = styled(Button)({
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
    backgroundColor: "#DDE3E7",
    borderColor: "#DDE3E7",
  },
  "&:active": {
    color: "#1C4B8E",
    borderColor: "#1C4B8E",
  },
});

export const StyledTypography = styled(Typography)`
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
`;

export const StyledTableCell = styled(TableCell)`
  border-bottom: none;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
`;

export const TitleContainer = styled(Box)({
  height: "72px",
  backgroundColor: "white",
});

export const Title = styled(Box)({
  position: "relative",
  height: "40px",
  padding: "16px 24px",
  fontFamily: "Commissioner",
  fontSize: "28px",
  fontWeight: 500,
  lineHeight: "40px",
  letterSpacing: "-0.2px",
  textAlign: "left",
  color: "#2D3540",
});

export const StatusContainer = styled(Box)({
  display: "flex",
  gap: "16px",
  flexDirection: "column",
  padding: "24px 0px",
});

export const FilterContainer = styled(Box)({
  padding: "16px 24px 16px 24px",
  height: "24px",
  gap: "4px",
});

export const StatusBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  backgroundColor: "#fff",
  borderRadius: "8px",
  gap: "16px",
  marginBottom: "16px",
  padding: "16px 24px",
});

export const PaginationContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  flexGrow: 1,
});

export const SearchContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  pt: 2,
  pb: 2,
  alignItems: "center",
  padding: "16px",
  height: "32px",
});

export const TableWrapper = styled(Paper)({
  boxShadow: "0px 2px 2px 0px #0426520F",
  borderRadius: "8px",
});

export const StyledTextField = styled(TextField)({
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
});
