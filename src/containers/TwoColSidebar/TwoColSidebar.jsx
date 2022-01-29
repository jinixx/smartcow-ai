import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import TwoColSidebarSidebar from './TwoColSidebarSidebar';
import TwoColSidebarNav from './TwoColSidebarNav';
import TwoColSidebarBrand from './TwoColSidebarBrand';
import { useAuth } from '../../components/Auth';
import { logoRoute, navRoutes, secondaryNavRoutes, site } from '../../routes';
import { Helmet } from 'react-helmet-async';

const TwoColSidebar = () => {
  const { path: logoPath } = logoRoute;
  const { name: logoName, icon: logoIcon } = logoRoute.navbar;
  const { user } = useAuth();
  const isLoggedIn = Boolean(user);
  const location = useLocation();

  return (
    <div className="twocolsidebar">
      <Helmet titleTemplate={`%s - ${site.name}`} defaultTitle={`${site.name}`}>
        <link rel="canonical" href={`${site.url}${location.pathname}`} />
      </Helmet>
      <TwoColSidebarSidebar>
        <TwoColSidebarBrand icon={logoIcon} name={logoName} path={logoPath} />
        <TwoColSidebarNav routes={navRoutes} showRestricted={isLoggedIn} />
        <TwoColSidebarNav routes={secondaryNavRoutes} showRestricted={isLoggedIn} className="nav-secondary" />
      </TwoColSidebarSidebar>
      <main className="twocolsidebar-main">
        <Outlet />
      </main>
    </div>
  );
}

export default TwoColSidebar;
