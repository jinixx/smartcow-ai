import { Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import { lazy } from '@loadable/component';
import TwoColSidebar from './containers/TwoColSidebar';
import { HomeIcon } from './app/views/Home';
import { SavedVideosIcon } from './app/views/SavedVideos';
import { VideoEditorIcon } from './app/views/VideoEditor';
import NotFound from './app/views/NotFound';
import IconAvatar from './components/IconAvatar';
import Loader from './components/Loader';
import PrivateRoute from './components/Routes/PrivateRoute';
import { Helmet } from 'react-helmet-async';

const site = {
  name: 'My App',
  url: 'https://mysite.com'
}

const navRoutes = [], secondaryNavRoutes = [];

const routes = mapRoutesForUse([
  {
    path: '/',
    name: 'Home',
    navbar: {
      icon: <HomeIcon />,
      name: 'Home'
    },
    isLogo: true,
    element: <TwoColSidebar />,
    children: [
      {
        index: true,
        element: <Navigate to="/video-editor" replace={true} />
      },
      {
        path: 'video-editor',
        name: 'Edit Video',
        asyncLoad: true,
        componentName: 'VideoEditor',
        navbar: {
          icon: <VideoEditorIcon />,
          name: 'Video Editor'
        },
        props: { onSaveNavigate: '/saved-videos' },
        restricted: true,
      },
      {
        path: 'video-editor/:id',
        name: 'Edit Video',
        asyncLoad: true,
        componentName: 'VideoEditor',
        props: { onSaveNavigate: '/saved-videos' },
        restricted: true,
      },
      {
        path: 'saved-videos',
        name: 'Saved Videos',
        asyncLoad: true,
        componentName: 'SavedVideos',
        navbar: {
          icon: <SavedVideosIcon />,
          name: 'Saved Videos'
        },
        restricted: true
      },
      {
        path: 'my-account',
        name: 'My Account',
        asyncLoad: true,
        componentName: 'MyAccount',
        secondaryNavbar: {
          icon: <IconAvatar name="My Account" />,
          name: 'My Account'
        },
        restricted: true
      },
      {
        path: 'signin',
        name: 'Sign In',
        asyncLoad: true,
        componentName: 'SignIn'
      },
      {
        path: 'signout',
        name: 'Sign Out',
        asyncLoad: true,
        componentName: 'SignOut',
        restricted: true
      },
      { path: '*', element: <NotFound /> }
    ]
  }
]);

const logoRoute = routes[0].isLogo && routes[0];

function HelmetWrap({ children, name }) {
  return (
    <>
      <Helmet>
        <title>{name}</title>
        {/* <link rxel="canonical" href={`${site.url}${fullPath}`} /> */}
      </Helmet>
      {children}
    </>
  )
}

function wrapRoute({ element, name, restricted }) {
  const withHelmet = <HelmetWrap name={name}>{element}</HelmetWrap>;

  if (!restricted) return withHelmet;

  return <PrivateRoute>{withHelmet}</PrivateRoute>;
}

function mapRoutesForUse(_routes, parentPath) {
  return _routes.map(item => {
    const {
      element,
      componentName,
      children,
      asyncLoad,
      isLogo,
      navbar,
      props,
      secondaryNavbar,
      restricted,
      name,
    } = item;

    if (!isLogo) {
      if (navbar) navRoutes.push(item);
      else if (secondaryNavbar) secondaryNavRoutes.push(item);
    }

    let Component, _element = element;

    if (asyncLoad && componentName) {
      Component = lazy(() => import(`./app/views/${componentName}`));
      _element = <Suspense fallback={<Loader delay="300" />}><Component {...props} /></Suspense>;
    }

    // const fullPath = `${parentPath && parentPath.endsWith('/') ? parentPath : !parentPath ? '' : parentPath + '/'}${path || ''}`;

    return {
      ...item,
      // fullPath,
      element: wrapRoute({ element: _element, name, restricted }),
      children: children && mapRoutesForUse(children),
    };
  });
};

export { routes, logoRoute, navRoutes, secondaryNavRoutes, site };