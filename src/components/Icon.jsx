import React from 'react';
import { Image } from 'react-bootstrap';
import classNames from 'classnames';

const Icon = ({ src, className, name, children, rounded, ...rest }) => (
  <div className={classNames('twocolsidebar-icon', className)} {...rest}>
    {
      (() => {
        if (children) return children;

        return (
          <Image src={src} alt={name} rounded={rounded} {...rest} />
        );
      })()
    }
    <span className="d-none">
      {name}
    </span>
  </div>
)

export default Icon;