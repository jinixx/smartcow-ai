import React from 'react';
import { Col, Nav, Row, Tab } from 'react-bootstrap';

const TabPane = ({ data = [], defaultActiveKey = '0' }) => {
  if (!Array.isArray(data) || (Array.isArray(data) && data.length === 0)) return null;

  return (
    <div className="tabpane">
      <Tab.Container defaultActiveKey={defaultActiveKey}>
        <Row>
          <Col>
            <Nav as="ul">
              {
                data.map(({ label }, idx) => (
                  <Nav.Item key={idx} as="li">
                    <Nav.Link eventKey={idx}>{label}</Nav.Link>
                  </Nav.Item>
                ))
              }
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col>
            <Tab.Content>
              {
                data.map(({ component }, idx) => (
                  <Tab.Pane eventKey={idx} key={idx}>
                    {component}
                  </Tab.Pane>
                ))
              }
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default TabPane;