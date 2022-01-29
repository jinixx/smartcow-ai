import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'react-bootstrap';
import ToggleButton from '../../../components/ToggleButton';
import { setActor, selectActorId } from './VideoEditorSlice';

const ActorPicker = () => {
  const dispatch = useDispatch();
  const data = [
    {
      id: 'anna',
      label: 'Anna',
      imageSrc: './actors/anna-148x83.png',
      videoThumbSrc: 'holder.js/700x394?auto=yes&text=Anna',
      videoSrc: 'path/to/anna.mp4'
    },
    {
      id: 'yoyo',
      label: 'Yoyo',
      imageSrc: './actors/yoyo-148x83.png',
      videoThumbSrc: './actors/yoyo-700x394.png',
      videoSrc: 'path/to/yoyo.mp4'
    },
    {
      id: 'skye',
      label: 'Skye',
      imageSrc: './actors/skye-148x83.png',
      videoThumbSrc: 'holder.js/700x394?auto=yes&text=Skye',
      videoSrc: 'path/to/skye.mp4'
    },
    {
      id: 'mike',
      label: 'Mike',
      imageSrc: './actors/mike-148x83.png',
      videoThumbSrc: 'holder.js/700x394?auto=yes&text=Mike',
      videoSrc: 'path/to/mike.mp4'
    },
    {
      id: 'vincent',
      label: 'Vincent',
      imageSrc: './actors/vincent-148x83.png',
      videoThumbSrc: 'holder.js/700x394?auto=yes&text=Vincent',
      videoSrc: 'path/to/vincent.mp4'
    },
    {
      id: 'peter',
      label: 'Peter',
      imageSrc: './actors/peter-148x83.png',
      videoThumbSrc: 'holder.js/700x394?auto=yes&text=Peter',
      videoSrc: 'path/to/peter.mp4'
    },
    {
      id: 'may',
      label: 'May',
      imageSrc: './actors/may-148x83.png',
      videoThumbSrc: 'holder.js/700x394?auto=yes&text=May',
      videoSrc: 'path/to/may.mp4'
    }
  ];
  const selectedActorId = useSelector(selectActorId);

  const handleOnChange = evt => {
    const actorId = evt.currentTarget.value;
    const actorObj = data.find(item => item.id === actorId);
    const { videoSrc, videoThumbSrc } = actorObj;

    dispatch(setActor({
      actorId,
      videoSrc,
      videoThumbSrc
    }));
  }

  return (
    <div className='actor-picker py-4'>
      {
        data.map((item, idx) => (
          <ToggleButton
            key={item.id}
            className="mt-4 btn-img b-0"
            id={`radio-actor-${item.id}`}
            type="radio"
            name="radio-actor"
            variant="outline"
            checked={selectedActorId === item.id}
            value={item.id}
            onChange={handleOnChange}
          >
            <Image rounded src={item.imageSrc} />
            <span className="label">{item.label}</span>
          </ToggleButton>
        ))
      }
    </div>
  )
};

export default ActorPicker;