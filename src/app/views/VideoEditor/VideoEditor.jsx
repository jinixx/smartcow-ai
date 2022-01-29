import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TwoColSidebarHeader, TwoColSidebarBody } from '../../../containers/TwoColSidebar';
import { Alert, Container, Row, Col, Button } from 'react-bootstrap';
import TitleEditor from './TitleEditor';
import VideoEditorVideoPreview from './VideoEditorVideoPreview';
import VideoScriptEditor from './VideoScriptEditor';
import TabPane from '../../../components/TabPane';
import ActorPicker from './ActorPicker';
import VoicePicker from './VoicePicker';
import AlignmentPicker from './AlignmentPicker';
import BackgroundPicker from './BackgroundPicker';
import { useSelector, useDispatch } from 'react-redux';
import { selectName, selectIsLoading, selectIsEditingVideo, selectError, reset } from './VideoEditorSlice';
import { saveVideo, loadVideo } from '../VideoEditor/VideoEditorSlice';
import { v4 as uuidv4 } from 'uuid';

const VideoEditor = ({ onSaveNavigate = '/' }) => {
  const tabPaneData = [
    {
      label: 'Actor',
      component: <ActorPicker />
    },
    {
      label: 'Voice',
      component: <VoicePicker />
    },
    {
      label: 'Alignment',
      component: <AlignmentPicker />
    },
    {
      label: 'Background',
      component: <BackgroundPicker />
    }
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const title = useSelector(selectName);
  const isSaving = useSelector(selectIsLoading);
  const isEditingVideo = useSelector(selectIsEditingVideo);
  const error = useSelector(selectError);
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(loadVideo({ videoId: id }));
    } else {
      if (isEditingVideo) dispatch(reset());
    }
    setInit(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleOnSave = async evt => {
    await dispatch(saveVideo({ videoId: isEditingVideo ? '' : uuidv4() }));

    navigate(onSaveNavigate);
  }

  const handleOnCancel = evt => {
    // confirm with user if unsave
    // then go where?
    // reset?
  }

  if (!init) return null;

  if (error && error.message === '404') return (
    <>
      <TwoColSidebarHeader
        title="Edit Video"
        className="has-btm-divider"
      />
      <TwoColSidebarBody className="d-flex flex-column">
        <Container fluid className="video-editor ms-0">
          <Row>
            <Col>
              <Alert variant="danger" className="mb-4">
                404 not found
              </Alert>
            </Col>
          </Row>
        </Container>
      </TwoColSidebarBody>
    </>
  )

  return (
    <>
      <TitleEditor
        className="twocolsidebar-main-header has-btm-divider"
        isEditing={!title}
        action={[
          <Button key="btn-cancel" variant="secondary" onClick={handleOnCancel}>Cancel</Button>,
          <Button key="btn-save" variant="success" onClick={handleOnSave} disabled={isSaving}>Save</Button>
        ]}
      />
      {/* <Alert message={authErrorMessage} show={!!authErrorMessage} /> */}
      <TwoColSidebarBody className="d-flex flex-column">
        <Container fluid className="video-editor ms-0">
          {
            error && (
              <Row>
                <Col>
                  <Alert variant="danger" className="mb-4">
                    {error.message}
                  </Alert>
                </Col>
              </Row>
            )
          }
          <Row>
            <Col lg={7}>
              <div className="video-editor-video-container">
                <VideoEditorVideoPreview />
                <VideoScriptEditor />
              </div>
            </Col>
            <Col lg={5}>
              <TabPane data={tabPaneData} defaultActiveKey="0" />
            </Col>
          </Row>
        </Container>
      </TwoColSidebarBody>
    </>
  )
}

export default VideoEditor;