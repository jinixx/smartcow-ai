import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { TwoColSidebarBody } from '../../containers/TwoColSidebar';

const NotFound = () => {
  return (
    <TwoColSidebarBody className="d-flex flex-column">
      <Container fluid className="video-editor ms-0">
        <Row>
          <Col className="mt-0">
            <h1>404</h1>
            <p>Oops, page not found!</p>
          </Col>
        </Row>
      </Container>
    </TwoColSidebarBody>
  )
}

export default NotFound;