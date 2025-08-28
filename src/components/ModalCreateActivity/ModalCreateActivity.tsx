import { Modal } from "react-bootstrap";
import "./ModalCreateActivity.css";

interface ModalCreateActivityProps {
  show: boolean;
  handleClose: () => void;
}

const ModalCreateActivity = ({ show, handleClose }: ModalCreateActivityProps) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      dialogClassName="bottom-sheet-modal"
      contentClassName="bottom-sheet-content"
      animation={true}
    >
      <div className="bottom-sheet-header">
        <span className="bottom-sheet-title">Crea</span>
        <button className="bottom-sheet-close" onClick={handleClose}>
          ✕
        </button>
      </div>

      <div className="bottom-sheet-body">
        Qui puoi inserire il contenuto della creazione di un’attività.
      </div>
    </Modal>
  );
};

export default ModalCreateActivity;
