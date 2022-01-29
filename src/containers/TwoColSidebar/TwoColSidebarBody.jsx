import React from 'react';
import classNames from 'classnames';

const TwoColSidebarBody = ({ className = '', children }) => (
  <div className={classNames('twocolsidebar-main-body', className)}>
    {children}
  </div>
)

export default TwoColSidebarBody;