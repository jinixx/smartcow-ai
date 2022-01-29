import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../components/Auth';
import { Container, Row, Col } from 'react-bootstrap';
import { TwoColSidebarHeader, TwoColSidebarBody } from '../../containers/TwoColSidebar';

export default function SignOut () {
  const { logout, user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace={true} />;
  }

  logout(user.token);

  return (
    <>
      <TwoColSidebarHeader title="Sign Out" />
      <TwoColSidebarBody className="d-flex flex-column justify-content-center">
        <Container className="offset-header" style={{ maxWidth: '400px' }}>
          <Row>
            <Col>
              Signing you out...
            </Col>
          </Row>
        </Container>
      </TwoColSidebarBody>
    </>
  )
}