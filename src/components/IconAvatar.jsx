import React from 'react';
import Icon from './Icon';
import classNames from 'classnames';
import { useAuth } from './Auth';

const IconAvatar = ({ className, ...rest }) => {
  const { user } = useAuth();

  return (
    <Icon src={user.avatar} className={classNames(className, 'icon-avatar')} {...rest} />
  )
}

export default IconAvatar;