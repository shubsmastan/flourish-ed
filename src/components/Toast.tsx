import Snackbar from "@mui/material/Snackbar";

interface ToastProps {
  open: boolean;
  message: string;
  handleClose: () => void;
}

const Toast = ({ open, message, handleClose }: ToastProps) => {
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoHideDuration={3000}
      onClose={handleClose}
      message={message}
    />
  );
};

export default Toast;
