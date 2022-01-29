import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

const ButtonSwitch = ({ className, content = {}, active = false, onToggle, label = {}, targetId = '', ...rest }) => {
  const { active: activeContent, inactive: inactiveContent } = content;
  const { active: activeLabel, inactive: inactiveLabel } = label;
  const [isActive, setIsActive] = useState(active);

  useEffect(() => {
    setIsActive(active);
  }, [active]);

  const handleOnClick = evt => {
    onToggle(evt, !isActive, targetId);
    setIsActive(!isActive);
  }

  return (
    <button
      type="button"
      className={classNames('btn-switch', `${isActive ? 'active' : ''}`, className)}
      aria-label={isActive ? activeLabel : inactiveLabel}
      onClick={handleOnClick}
      {...rest}
    >
      {isActive ? activeContent : inactiveContent}
    </button>
  )
}

export default ButtonSwitch;