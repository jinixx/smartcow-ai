import React, { useEffect } from 'react';
import { TwoColSidebarHeader, TwoColSidebarBody } from '../../containers/TwoColSidebar';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import LoginForm, { useAuth } from '../../components/Auth';
import Alert from '../../components/Alert';

function SignIn () {
  const { error: authError, user } = useAuth();
  const { message: authErrorMessage = '' } = authError || {};

  useEffect(() => {
    document.body.classList.add('showBackground');

    return () => {
      document.body.classList.remove('showBackground');
    }
  }, [])

  if (user) {
    return <Navigate to="/my-account" />
  }

  return (
    <>
      <TwoColSidebarHeader title="Sign In" />
      <Alert message={authErrorMessage} show={!!authErrorMessage} />
      <TwoColSidebarBody className="d-flex flex-column justify-content-center">
        <Container className="offset-header" style={{ maxWidth: '400px' }}>
          <Row>
            <Col>
              <LoginForm />
            </Col>
          </Row>
          <Row style={{ marginTop: '63px' }}>
            <Col className='text-center'>
              New here? <Link tabIndex="5" to="/signup">Signup</Link>
            </Col>
          </Row>
        </Container>
      </TwoColSidebarBody>
    </>
  )
}

export default SignIn;