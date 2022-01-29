import React, { useEffect } from 'react';
import { Image } from 'react-bootstrap';
import useSound from 'use-sound';
import ButtonSwitch from './ButtonSwitch';
// import 'external-svg-loader';

const AudioToggler = ({ audioSrc = '', isPlaying = false, clipSrc = '', label = '', onToggle, onAudioEnd, targetId = '' }) => {
  // https://github.com/joshwcomeau/use-sound/issues/14
  // useSound if unmounted has a state update causing noop, shown on video not found page
  // TODO: update useSound / monitor above issue
  const [play, { stop, duration }] = useSound(audioSrc, {
    onend: () => {
      onAudioEnd(targetId);
    },
  });

  useEffect(() => {
    if (isPlaying) {
      play();
    } else {
      stop();
    }
  }, [isPlaying, play, stop]);

  // useEffect(() => {
  //   console.log('clip duration', duration);
  // }, [duration]);

  return (
    <div className="audio-toggler">
      <ButtonSwitch
        className="btn-toggle-play circle"
        content={{
          active: <i className="bi bi-stop-fill"></i>,
          inactive: <i className="bi bi-play-fill"></i>
        }}
        label={{
          active: `stop audio "${label}"`,
          inactive: `Play audio "${label}"`
        }}
        active={isPlaying}
        onToggle={onToggle}
        targetId={targetId}
      />
      <div className="audio-content">
        <span className="label">{label}</span>
        <div className="equalizer-container">
          {/* <svg
            className="equalizer"
            data-src={clipSrc}
            data-cache="disabled"
            // fill="currentColor"
            // width="50px"
            // height="50px"
            // style={{
            //   color: "red"
            // }}
          /> */}
          <Image src={clipSrc} className="equalizer" />
          <div
            className="equalizer-color"
            style={{
              transitionProperty: 'width',
              transitionTimingFunction: 'linear',
              transitionDuration: `${isPlaying ? Math.ceil(duration) || 0 : 0}ms`,
              width: `${isPlaying ? '100%' : '0'}`,
              opacity: `${isPlaying ? '1' : '0'}`
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default AudioToggler;