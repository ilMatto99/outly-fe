import { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import "./ButtonFooter.css";
import Icon from "../Icon/Icon";
import ModalCreateActivity from "../ModalCreateActivity/ModalCreateActivity";

const ButtonFooter = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <Container fluid className="button-footer-container">
        <Row className="justify-content-center">
          <Col xs="auto">
            <Button
              className="custom-fab-button"
              onClick={() => setShowModal(true)}
            >
              <Icon name="plus" size={48} color="white" />
            </Button>
          </Col>
        </Row>
      </Container>

      <ModalCreateActivity
        show={showModal}
        handleClose={() => setShowModal(false)}
      />
    </>
  );
};

export default ButtonFooter;
