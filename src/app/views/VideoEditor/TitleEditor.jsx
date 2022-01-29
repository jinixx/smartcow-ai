import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Formik, Field, Form } from 'formik';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ToggleButton from '../../../components/ToggleButton';
import * as Yup from 'yup';
import { saveTitle, selectName, selectTags } from './VideoEditorSlice';
import { useEffect } from 'react';

const ValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Required')
});

const OverlayContent = ({ placeHolder, title = '', onSave, tags = [], selectedTags }) => (
  <>
    <div className="overlay-white"></div>
    <Formik
      initialValues={{
        title,
        tags: selectedTags !== '' ? selectedTags : undefined,
      }}
      validationSchema={ValidationSchema}
      onSubmit={(values) => {
        onSave(values);
      }}
      validateOnChange
    >
      {({ errors, handleSubmit, touched, values }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Container className="title-editor-overlaycontainer col-lg-10">
            <Row>
              <Col>
                <Field
                  className="title-editor-overlaycontainer-input"
                  name="title"
                  type="text"
                  placeholder={placeHolder}
                  autoFocus
                />
              </Col>
            </Row>
            <Row>
              <Col className="title-editor-overlaycontainer-text">
                Fusce quis magna vel ex pellentesque consequat sed et turpis. Vivamus bibendum rutrum euismod. Sed non sagittis est, semper
                <div style={{ borderBottom: '1px solid rgba(0, 0, 0, .1)', marginTop: '.5rem' }}> </div>
              </Col>
            </Row>
            {
              Array.isArray(tags) && tags.length > 0 && (
                <Row className="pt-3">
                  <Col>
                    {
                      tags.map((item, idx) => (
                        <Field
                          key={item.id}
                          type="checkbox"
                          value={item.id}
                          name="tags"
                        >
                          {({ field, form: { setFieldValue } }) => (
                            <ToggleButton
                              id={`tags-checkbox-${item.id}`}
                              className="thin mt-3 me-3"
                              type="checkbox"
                              variant="outline"
                              {...field}
                            >
                              {item.label}
                            </ToggleButton>
                          )}
                        </Field>
                      ))
                      // <Form.Check
                      //   key={item.id}
                      //   type="checkbox"
                      //   id={`tags-checkbox-${item.id}`}
                      //   name="tags-checkbox"
                      //   label={item.label}
                      //   inline
                      //   className="input-checkbox-radio-pill"
                      // />
                    }
                  </Col>
                </Row>
              )
            }
            <Row>
              <Col>
                <Button
                  variant="success"
                  style={{ marginTop: '2.3rem' }}
                  disabled={errors.title || !values.title}
                  type="submit"
                >
                  Save
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      )}
    </Formik>
  </>
)

const TitleEditor = ({ className = '', isEditing = false, action }) => {
  const placeHolder = 'Enter Video Title';
  const [isEditingTitle, setIsEditingTitle] = useState(isEditing);
  const title = useSelector(selectName);
  const selectedTags = useSelector(selectTags);
  const dispatch = useDispatch();
  const tags = [
    {
      id: 'email',
      label: 'Email'
    },
    {
      id: 'marketing',
      label: 'Marketing'
    },
    {
      id: 'greeting',
      label: 'Greeting'
    },
    {
      id: 'email2',
      label: 'Email'
    },
    {
      id: 'marketing2',
      label: 'Marketing'
    },
    {
      id: 'greeting2',
      label: 'Greeting'
    }
  ];

  useEffect(() => {
    setIsEditingTitle(isEditing);
  }, [isEditing]);

  const handleButtonShowOnClick = evt => {
    setIsEditingTitle(true);
  }

  const handleClickSave = values => {
    const { title, tags } = values;
    setIsEditingTitle(false);
    dispatch(saveTitle({ name: title, tags }));
  }

  return (
    <>
      <Container as="header" className={classNames('title-editor', className)} fluid>
        <Row>
          <Col className="title-editor-title">
            <h1 className="truncate">{title || placeHolder}</h1>
            <button className="btn-edit" type="button" onClick={handleButtonShowOnClick}>
              <i className="bi bi-chevron-down"></i>
            </button>
          </Col>
          {/* <Col className="empty-filler"></Col> */}
          {
            Array.isArray(action) && action.length && (
              <Col className="header-action d-flex justify-content-lg-end">
                {action.map(item => item)}
              </Col>
            )
          }
        </Row>
      </Container>
      {
        isEditingTitle &&
          <OverlayContent
            placeHolder={placeHolder}
            title={title}
            onSave={handleClickSave}
            tags={tags}
            selectedTags={selectedTags}
          />
      }
    </>
  )
}

export default TitleEditor;