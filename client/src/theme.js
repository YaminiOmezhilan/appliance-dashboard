import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Commissioner', sans-serif",
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          "@media (min-width: 1200px)": {
            maxWidth: "none", // Override the default max-width
          },
        },
      },
    },
  },
});

export default theme;
