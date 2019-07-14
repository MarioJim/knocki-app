import React from 'react';
import { NavLink } from 'react-router-dom';

import { ReactComponent as DevicesBtn } from './devices.svg';
import { ReactComponent as GesturesBtn } from './gestures.svg';
import { ReactComponent as SettingsBtn } from './settings.svg';
import styles from './index.module.scss';

const Navigation: React.FC = () => (
  <nav className={styles.nav}>
    <NavLink to="/devices" activeClassName={styles.active}>
      <DevicesBtn />
    </NavLink>
    <NavLink to="/gestures" activeClassName={styles.active}>
      <GesturesBtn />
    </NavLink>
    <NavLink to="/settings" activeClassName={styles.active}>
      <SettingsBtn />
    </NavLink>
  </nav>
);

export default Navigation;
