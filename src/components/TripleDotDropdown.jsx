import React from 'react';
import classNames from 'classnames';
import { ButtonGroup, Dropdown } from 'react-bootstrap';

const TripleDotDropdown = ({ menu, className, style = {}, onSelect }) => (
  <Dropdown as={ButtonGroup} className={classNames('triple-dot-dropdown', className)} style={style} align="start" drop="start" onSelect={onSelect}>
    <Dropdown.Toggle variant="outline"><i className="bi bi-three-dots"></i></Dropdown.Toggle>
    <Dropdown.Menu>
      {
        menu.map((item, idx) => (
          item.separator ?
            <Dropdown.Divider key={idx} /> :
            <Dropdown.Item key={item.id} eventKey={item.id} active={item.active || false}>{item.label}</Dropdown.Item>
        ))
      }
    </Dropdown.Menu>
  </Dropdown>
);

export default TripleDotDropdown;