import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Spinner from "./Spinner";

const Loading = ({ open }: { open: boolean }) => {
  return (
    <Modal open={open}>
      <Fade in={open}>
        <div
          className="absolute left-1/2 top-1/2 flex h-full -translate-x-1/2
          -translate-y-1/2 items-center justify-center outline-none">
          <Spinner />
        </div>
      </Fade>
    </Modal>
  );
};

export default Loading;
