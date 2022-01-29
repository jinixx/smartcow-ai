import React from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { routes } from './routes';
import './App.scss';

const AppWithRoutes = () => {
  const element = useRoutes(routes);

  return (
    <div className="app">
      {element}
    </div>
  )
}

function App() {
  return (
    <Router>
      <HelmetProvider>
        <AppWithRoutes />
      </HelmetProvider>
    </Router>
  )
}

export default App;
