import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import classNames from 'classnames';

// https://github.com/react-bootstrap/react-router-bootstrap/issues/242
const RouterNavLink = ({ children, className, ...props }) => (
  <LinkContainer {...props}>
    <Nav.Link className={classNames(className)} active={false}>
      {children}
    </Nav.Link>
  </LinkContainer>
)

const TwoColSidebarNav = ({ className, routes, showRestricted }) => (
  <Nav className={classNames('twocolsidebar-nav flex-column', className)}>
    {
      routes.map(({ navbar = null, secondaryNavbar = null, path, restricted }, idx) => {
        let _navbar = navbar || secondaryNavbar || {};
        const { name = '', icon, className } = _navbar;

        if (restricted && !showRestricted) return null;

        return (
          <RouterNavLink key={`${idx}${name}`} to={path} className={className}>{icon || name}</RouterNavLink>
        );
      })
    }
  </Nav>
)

export default TwoColSidebarNav;