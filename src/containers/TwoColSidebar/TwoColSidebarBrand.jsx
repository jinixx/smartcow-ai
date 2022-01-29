import React from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import Nav from 'react-bootstrap/Nav';
import classNames from 'classnames';

const TwoColSidebarBrand = ({ className, icon, name, path }) => (
  <LinkContainer to={path}>
    <Nav.Link className={classNames('twocolsidebar-logo', className)}>{icon || name}</Nav.Link>
  </LinkContainer>
)

export default TwoColSidebarBrand;