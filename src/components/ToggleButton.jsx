import React from 'react';
import classNames from 'classnames';
import { ToggleButton as RBSToggleButton } from 'react-bootstrap';

const ToggleButton = ({ className, children, ...rest }) => (
  <RBSToggleButton
    className={classNames('btn-toggle', className)}
    {...rest}
  >
    {children}
  </RBSToggleButton>
);

export default ToggleButton;