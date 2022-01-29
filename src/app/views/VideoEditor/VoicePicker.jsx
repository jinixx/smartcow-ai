import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ToggleButton from '../../../components/ToggleButton';
import AudioToggler from '../../../components/AudioToggler';
import { selectVoiceId, setVoice } from './VideoEditorSlice';

const VoicePicker = () => {
  const dispatch = useDispatch();
  const data = [
    {
      id: 'asian',
      label: 'Asian',
      clipSrc: './voice/asian/clip-path.svg',
      audioSrc: './voice/asian/TunePocket-Funny-Kung-Fu-Yell-Preview.mp3'
    },
    {
      id: 'british',
      label: 'British',
      clipSrc: './voice/british/clip-path.svg',
      audioSrc: './voice/british/TunePocket-Happy-Holidays-Christmas-Audio-Greeting-Preview.mp3'
    },
    {
      id: 'american',
      label: 'American',
      clipSrc: './voice/american/clip-path.svg',
      audioSrc: './voice/american/TunePocket-OMG-1-Preview.mp3'
    }
  ];
  const [currPlayingId, setCurrPlayingId] = useState('');
  const selectedVoiceId = useSelector(selectVoiceId);

  const handleOnChange = evt => {
    const voiceId = evt.currentTarget.value;
    const voiceObj = data.find(item => item.id === voiceId);
    const { audioSrc } = voiceObj;

    dispatch(setVoice({
      voiceId,
      voiceSrc: audioSrc
    }));
  }

  const handleOnToggleVoicePlay = (evt, isActive, targetId) => {
    if (isActive) {
      setCurrPlayingId(targetId);

    } else {
      if (targetId === currPlayingId) {
        setCurrPlayingId('');
      }
    }
  }

  const handleOnAudioEnded = (targetId) => {
    setCurrPlayingId('');
  }

  return (
    <div className='voice-picker py-4'>
      {
        data.map((item, idx) => (
          <ToggleButton
            key={item.id}
            className="mt-4 btn-img"
            id={`radio-voice-${item.id}`}
            type="radio"
            name="radio-voice"
            variant="outline-primary"
            checked={selectedVoiceId === item.id}
            value={item.id}
            onChange={handleOnChange}
            as="div"
          >
            <AudioToggler
              audioSrc={item.audioSrc}
              isPlaying={item.id === currPlayingId}
              clipSrc={item.clipSrc}
              label={item.label}
              targetId={item.id}
              onToggle={handleOnToggleVoicePlay}
              onAudioEnd={handleOnAudioEnded}
            />
          </ToggleButton>
        ))
      }
    </div>
  )
};

export default VoicePicker;