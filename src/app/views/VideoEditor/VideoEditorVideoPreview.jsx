import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import VideoPreview from '../../../components/VideoPreview';
import { selectVideoSrc, selectVideoThumbSrc } from './VideoEditorSlice';
import { run as runHolder } from 'holderjs/holder';

const VideoEditorVideoPreview = () => {
  const videoSrc = useSelector(selectVideoSrc);
  const videoThumbSrc = useSelector(selectVideoThumbSrc) || 'holder.js/700x394?auto=yes&text=Create%20your%20video';

  useEffect(() => {
    if (videoThumbSrc.startsWith('holder.js/')) runHolder();
  }, [videoThumbSrc]);

  return (
    <VideoPreview thumbSrc={videoThumbSrc} videoSrc={videoSrc} />
  )
}

export default VideoEditorVideoPreview;