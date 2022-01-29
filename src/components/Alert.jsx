import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert as RBSAlert } from 'react-bootstrap';

function Alert({ message, show, fluid = true }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(show);
  }, [show]);

  if (!visible) return null;

  return (
    <Container fluid={fluid}>
      <Row>
        <Col>
          <RBSAlert variant="danger" onClose={() => setVisible(false)} dismissible>
            <RBSAlert.Heading>Oh snap! You got an error!</RBSAlert.Heading>
            <p>
              {message}
            </p>
          </RBSAlert>
        </Col>
      </Row>
    </Container>
  );
}

export default Alert;