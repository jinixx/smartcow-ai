import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { setVideoScript, selectVideoScript } from './VideoEditorSlice';

const VideoScriptEditor = () => {
  const dispatch = useDispatch();
  const videoScriptPlaceholder = 'Type or paste your videoscript here. You can also request a translation of an English script to any of 27 other languages';
  const videoScript = useSelector(selectVideoScript);

  const handleOnClickListen = evt => {
    console.log('call text-to-speech');
  }

  const handleTextareaOnChange = evt => {
    dispatch(setVideoScript({ videoScript: evt.target.value }));
  }

  return (
    <Form>
      <div className="textarea-container mt-4">
        <Form.Group controlId="textareaVideoScript">
          <Form.Control
            as="textarea"
            rows={4}
            placeholder={videoScriptPlaceholder}
            onChange={handleTextareaOnChange}
            value={videoScript}
          />
        </Form.Group>
        <div className="mt-5 d-flex align-items-end">
          <Button
            variant="secondary"
            onClick={handleOnClickListen}
            disabled={videoScript ? !Boolean(videoScript.length) : true}
          >
            Listen
          </Button>
          <span className="ms-auto char-count">{`${videoScript ? videoScript.length : '0'}`} char</span>
        </div>
      </div>
    </Form>
  )
}

export default VideoScriptEditor;