import React from 'react';
import { Link } from 'react-router-dom';
import Toggle from 'react-toggle';

import { ReactComponent as LogoSVG } from './logo.svg';
import { Device } from '../../store/devices/types';
import styles from './DeviceListing.module.scss';
import 'react-toggle/style.css';

export interface toggleDeviceInterface {
  (id: string): void
}

interface Props {
  device: Device
  toggleDevice: toggleDeviceInterface
}

const DeviceListing: React.FC<Props> = ({ device, toggleDevice }) => (
  <div className={styles.device}>
    <LogoSVG className={device.isOn ? 'on' : 'off'} />
    <Link to={`/editDevice/${device.id}`}>
      <h5>{device.room}</h5>
      <h5>{device.surface}</h5>
      <span>Status: </span>
      { device.isOn ?
        <span className={styles.on}>Online</span> :
        <span className={styles.off}>Offline</span> }
    </Link>
    <Toggle 
      defaultChecked={device.isOn}
      icons={false}
      onChange={() => { toggleDevice(device.id); }}
    />
  </div>
);

export default DeviceListing;
