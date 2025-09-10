import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css'; 
import ButtonFooter from '../ButtonFooter/ButtonFooter'; 
import Icon from '../Icon/Icon';

const Footer = () => {
  return (
    <Container fluid className="app-footer">
      <Row className="h-100 align-items-center">
        {/* Colonna 1: Home */}
        <Col className="footer-item text-center">
          <Icon name="home" size={28} color="#212529" />
          <div className="footer-label">Home</div>
        </Col>

        {/* Colonna 2: Pulsante Centrale */}
        <Col className="footer-item text-center">
          <ButtonFooter />
        </Col>

        {/* Colonna 3: Profilo */}
        <Col className="footer-item text-center">
          <Icon name="user" size={28} color="#212529" />
          <div className="footer-label">Profilo</div>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;