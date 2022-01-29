import React from 'react';
import { Button, Image } from 'react-bootstrap';

const VideoPreview = ({ thumbSrc, videoSrc }) => {
  const handlePreviewOnClick = evt => {
    console.log('preview video:', videoSrc);
  }

  return (
    <div
      className="video-preview"
      onClick={videoSrc ? handlePreviewOnClick : undefined}
      style={{ cursor: `${videoSrc ? 'pointer' : 'auto'}` }}
    >
      {thumbSrc && <Image rounded={true} src={thumbSrc} />}
      {videoSrc && <Button className="btn-video-preview" variant="light">Preview</Button>}
    </div>
  )
}

export default VideoPreview;