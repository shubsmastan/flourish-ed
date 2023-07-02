import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loading = ({ open }: { open: boolean }) => {
  return (
    <Modal open={open}>
      <Fade in={open}>
        <div
          className="absolute left-1/2 top-1/2 flex h-full -translate-x-1/2
          -translate-y-1/2 items-center justify-center outline-none">
          <FontAwesomeIcon icon={faSpinner} size="xl" color="#0f172a" spin />
        </div>
      </Fade>
    </Modal>
  );
};

export default Loading;
