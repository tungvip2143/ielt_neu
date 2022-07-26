import * as React from 'react';
import { Link,LinkProps } from 'react-router-dom';

 interface  ILinkProps extends LinkProps {
}

export default function LinkCustom (props: ILinkProps) {
  return (
    <Link style={{textDecoration:"none"}} {...props}>
      {props.children}
    </Link>
  );
}
