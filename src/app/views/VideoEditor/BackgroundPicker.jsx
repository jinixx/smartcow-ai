import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, Image } from 'react-bootstrap';
import ToggleButton from '../../../components/ToggleButton';
import { useFilePicker } from 'use-file-picker';
import { selectBackgroundParam, setBackground } from './VideoEditorSlice';

const BackgroundPicker = () => {
  const dispatch = useDispatch();
  const dataBgImages = [
    {
      id: 'office.jpg',
      label: 'Office',
      imageSrc: './background-images/office-150x85.jpg'
    },
    {
      id: 'space.jpg',
      label: 'Space',
      imageSrc: './background-images/space-150x85.jpg'
    },
    {
      id: 'noise.jpg',
      label: 'Noise',
      imageSrc: './background-images/noise-150x85.jpg'
    },
    {
      id: 'meeting-room.jpg',
      label: 'Meeting Room',
      imageSrc: './background-images/meeting-room-150x85.jpg'
    },
    {
      id: 'books.jpg',
      label: 'Books',
      imageSrc: './background-images/books-150x85.jpg'
    },
    {
      id: 'desk.jpg',
      label: 'Desk',
      imageSrc: './background-images/desk-150x85.jpg'
    }
  ];

  const [openFileSelector, { filesContent, loading, errors, plainFiles, clear }] = useFilePicker({
    multiple: false,
    readAs: 'DataURL', // availible formats: "Text" | "BinaryString" | "ArrayBuffer" | "DataURL"
    accept: '.jpg,.jpeg,.png',
    limitFilesConfig: { min: 1, max: 1 },
    // minFileSize: 1, // in megabytes
    // maxFileSize: 1,
    // readFilesContent: false, // ignores file content
  });

  const selectedBackgroundParam = useSelector(selectBackgroundParam);

  const handleOnChange = evt => {
    const { name: backgroundType, value: backgroundParam } = evt.currentTarget;

    dispatch(setBackground({ backgroundType, backgroundParam }));
  }

  const handleOnClickUpload = evt => {
    openFileSelector();
  }

  useEffect(() => {
    console.log('files seleted:', plainFiles);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(plainFiles)])

  return (
    <div className="background-picker py-4">
      <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Images</Accordion.Header>
          <Accordion.Body className="background-picker-images">
            <ToggleButton
              className="btn-img b-0"
              id="radio-background-image-upload"
              type="radio"
              name="backgroundImage"
              variant="outline"
              checked={selectedBackgroundParam === 'upload.jpg'}
              value="upload.jpg"
              onChange={handleOnChange}
              onClick={handleOnClickUpload}
            >
              {/* If readAs is set to DataURL, You can display an image */}
              {/* {!!filesContent.length && <img src={filesContent[0].content} />} */}
              <div className="img-container rounded">
                <i className="bi bi-upload"></i>
              </div>
              <span className="label">Upload</span>
            </ToggleButton>
            {
              dataBgImages.map((item, idx) => (
                <ToggleButton
                  key={item.id}
                  className="btn-img b-0"
                  id={`radio-background-image-${item.id}`}
                  type="radio"
                  name="backgroundImage"
                  variant="outline"
                  checked={selectedBackgroundParam === item.id}
                  value={item.id}
                  onChange={handleOnChange}
                >
                  <Image rounded src={item.imageSrc} />
                  <span className="label">{item.label}</span>
                </ToggleButton>
              ))
            }
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Solid Colours</Accordion.Header>
          <Accordion.Body>
            Solid Colours
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
            est laborum.
            </p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Videos</Accordion.Header>
          <Accordion.Body>
            Videos
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
            est laborum.
            </p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

export default BackgroundPicker;