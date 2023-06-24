import { forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import { lato } from "@/libs/fonts";
import { ThemeProvider, createTheme } from "@mui/material";

interface ToastProps {
  open: boolean;
  message: string;
  handleClose: () => void;
}

const theme = createTheme({
  typography: {
    fontFamily: ["Lato", "sans-serif"].join(","),
  },
});

const Toast = ({ open, message, handleClose }: ToastProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
      />
    </ThemeProvider>
  );
};

export default Toast;
