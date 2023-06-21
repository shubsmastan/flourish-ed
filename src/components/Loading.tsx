import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "transparent",
  outline: "none",
};

const Loading = ({ open }: { open: boolean }) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}>
      <Fade in={open}>
        <Box sx={style}>
          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h2"
            style={{
              textAlign: "center",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <div>
              <FontAwesomeIcon
                icon={faSpinner}
                size="xl"
                color="#0f172a"
                spin
              />
            </div>
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Loading;
