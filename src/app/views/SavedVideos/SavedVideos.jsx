import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { TwoColSidebarBody, TwoColSidebarHeader } from '../../../containers/TwoColSidebar';
import SavedVideo from './SavedVideo';
import { selectVideos, removeVideo } from './SavedVideosSlice';
import { run as runHolder } from 'holderjs/holder';

const SavedVideos = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const videos = useSelector(selectVideos);
  console.log(videos);

  useEffect(() => {
    runHolder();
  }, []);

  const handleOnCreateNew = () => {
    navigate('/video-editor');
  }

  const handleOnClick = (id) => {
    navigate(`/video-editor/${id}`);
  }

  const handleOnDelete = (id) => {
    console.log('delete:', id);
    // TODO:
    // Confirmation modal before deleting

    dispatch(removeVideo({ videoId: id }));
  }

  return (
    <>
      <TwoColSidebarHeader
        title="Saved Videos"
        className="has-btm-divider"
        action={[
          <Button key="btn-create-new" variant="success" style={{ whiteSpace: 'nowrap' }} onClick={handleOnCreateNew}>Create New</Button>
        ]}
      />
      <TwoColSidebarBody className="d-flex flex-column">
        <Container className="saved-videos ms-0">
          <Row>
              {
                Object.keys(videos).map(key => (
                  <Col key={key} xs={12} md={6} lg={4} xl={3} className="d-flex">
                    <SavedVideo
                      id={key}
                      name={videos[key].name}
                      tags={videos[key].tags.split(',').filter(x => x !== '')}
                      videoThumbSrc={videos[key].videoThumbSrc}
                      onClick={handleOnClick}
                      onDelete={handleOnDelete}
                    />
                  </Col>
                ))
              }

          </Row>
        </Container>
      </TwoColSidebarBody>
    </>
  )
}

export default SavedVideos;