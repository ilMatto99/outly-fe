import { Button, Container, Row, Col } from 'react-bootstrap';
import './ButtonFooter.css';
import Icon from '../Icon/Icon';

const ButtonFooter = () => {
    return (
        <Container fluid className="button-footer-container">
            <Row className="justify-content-center">
                <Col xs="auto">
                    <Button className="custom-fab-button">
                        <Icon name="plus" size={48} color="white" />
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default ButtonFooter;