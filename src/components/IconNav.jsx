import React from 'react';
import Icon from './Icon';
import classNames from 'classnames';

const IconNav = ({ className, ...rest }) => (
  <Icon className={classNames(className, 'icon-nav dualtone')} {...rest} />
)

export default IconNav;