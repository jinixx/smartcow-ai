import React from 'react';
import classNames from 'classnames';
import { Container, Row, Col } from 'react-bootstrap';

const TwoColSidebarHeader = ({ className = '', title = '', action }) => (
  <Container as="header" className={classNames('twocolsidebar-main-header', className)} fluid>
    <Row>
      <Col className="header-container">
        <h1 className="truncate">{title}</h1>
      </Col>
      {
        action && (
          <Col className="header-action d-flex justify-content-lg-end">
            {action}
          </Col>
        )
      }
    </Row>
  </Container>
)

export default TwoColSidebarHeader;