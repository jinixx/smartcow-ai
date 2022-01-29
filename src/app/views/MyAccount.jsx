import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { TwoColSidebarBody, TwoColSidebarHeader } from '../../containers/TwoColSidebar';

const MyAccount = () => {
  const navigate = useNavigate();

  const handleOnLogout = () => {
    navigate('/signout');
  }

  return (
    <>
      <TwoColSidebarHeader
        title="My Account"
        className="has-btm-divider"
        action={[
          <Button key="btn-logout" variant="danger" onClick={handleOnLogout}>Logout</Button>
        ]}
      />
      <TwoColSidebarBody className="d-flex flex-column">
        <Container className="saved-videos ms-0">
          <Row>
            <Col>
              My account
            </Col>
          </Row>
        </Container>
      </TwoColSidebarBody>
    </>
  )
}

export default MyAccount;