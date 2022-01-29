import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import useAuth from './useAuth';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const schema = Yup.object({
  user: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .required('Required'),
});

export default function LoginForm () {
  const { login, status: authStatus } = useAuth();

  return (
    <Formik
      validationSchema={schema}
      onSubmit={values => {
        login(values.user, values.password);
      }}
      initialValues={{
        user: '',
        password: '',
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-4" controlId="formSigninEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="user"
              type="email"
              placeholder="Enter your email"
              className="primary"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.user}
              isInvalid={!!errors.user}
              tabIndex="1"
            />
            <Form.Control.Feedback type="invalid">
              {errors.user}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-5 position-relative" controlId="formSigninPassword">
            <Form.Label>Password</Form.Label>
            <Link tabIndex="4" style={{ position: 'absolute', right: 0 }} to="/forgot">Forgot?</Link>
            <Form.Control
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              isInvalid={!!errors.password}
              tabIndex="2"
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            tabIndex="3"
            className="d-block mx-auto"
            variant="primary"
            type="submit"
            disabled={authStatus === 'loading'}
          >
            Login
          </Button>
        </Form>
      )}
    </Formik>
  )
}