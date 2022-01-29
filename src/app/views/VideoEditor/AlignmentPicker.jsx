import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ToggleButton from '../../../components/ToggleButton';
import { setAlignment, selectAlignment } from './VideoEditorSlice';

const AlignmentPicker = () => {
  const dispatch = useDispatch();
  const data = [
    {
      id: 'left',
      label: 'Left'
    },
    {
      id: 'center',
      label: 'Center'
    },
    {
      id: 'right',
      label: 'Right'
    }
  ];

  const selectedAlignment = useSelector(selectAlignment);

  const handleOnChange = evt => {
    dispatch(setAlignment({ alignment: evt.currentTarget.value }));
  }

  return (
    <div className="alignment-picker py-4">
      {
        data.map((item, idx) => (
          <ToggleButton
            key={item.id}
            className="mt-4 me-3"
            id={`radio-alignment-${item.id}`}
            type="radio"
            name="radio-alignment"
            variant="outline-primary"
            checked={selectedAlignment === item.id}
            value={item.id}
            onChange={handleOnChange}
          >
            {item.label}
          </ToggleButton>
        ))
      }
    </div>
  )
}

export default AlignmentPicker;