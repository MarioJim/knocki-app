import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import { ReactComponent as AvatarImg } from './avatar.svg';
import styles from './index.module.scss';

interface Props  extends RouteComponentProps {
  title?: string
}

interface PathLookupTableItem {
  path: string
  title: string
}

const pathLookupTable: PathLookupTableItem[] = [
  { path: '/devices', title: 'Devices', },
  { path: '/gestures', title: 'Gestures', },
  { path: '/addDevice', title: 'Add a device', },
  { path: '/addGesture', title: 'Add a gesture', },
  { path: '/editDevice', title: 'Edit a device', },
  { path: '/editGesture', title: 'Edit a gesture', },
  { path: '/settings', title: 'Settings', },
  { path: '/', title: 'Knocki', },
];

const getTitle = (pathname: string): string => {
  const match = pathLookupTable.find(({ path }) => pathname.startsWith(path));
  if (match)
    return match.title;
  return 'Knocki';
};

const Header: React.FC<Props> = ({ title, location }) => {
  const renderedTitle = title || getTitle(location.pathname);
  return (
    <header className={styles.header}>
      <AvatarImg />
      <h4>{renderedTitle}</h4>
    </header>
  );
};

export default withRouter(Header);
