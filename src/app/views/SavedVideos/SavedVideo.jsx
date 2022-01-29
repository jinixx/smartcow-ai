import React from 'react';
import { Card } from 'react-bootstrap';
import TripleDotDropdown from '../../../components/TripleDotDropdown';

const Tag = ({ children }) => (
  <div className="tag">
    {children}
  </div>
)

const SavedVideo = ({ id, name, tags, videoThumbSrc, onClick, onDelete }) => {
  const menuItems = [
    {
      id: 'delete',
      label: 'Delete'
    }
  ];

  const handleOnSelectMenu = (eventKey, evt) => {
    switch (eventKey) {
      case 'delete':
        onDelete(id, evt);
        break;

      default:
        break;
    }
  }

  return (
    <div className="saved-video">
      <Card className="rounded p-2 border-0" onClick={e => onClick(id, e)}>
        <Card.Img variant="top" src={videoThumbSrc || 'holder.js/700x394?auto=yes&text=None'} className="rounded" />
        <Card.Body className="text-center">
          <Card.Title as="h4" className="truncate">{name}</Card.Title>
          {
            tags.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))
          }
        </Card.Body>
      </Card>
      <TripleDotDropdown
        className="position-absolute"
        style={{
          right: '12px',
          top: '5px',
        }}
        menu={menuItems}
        onSelect={handleOnSelectMenu}
      />
    </div>
  )
}

export default SavedVideo;