import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';

import DeviceListing, { toggleDeviceInterface } from './DeviceListing';
import { ReactComponent as AddBtn } from './add.svg';
import { AppState } from '../../store';
import { Device } from '../../store/devices/types';
import { toggleDevice } from '../../store/devices/actions';
import styles from './index.module.scss';

interface StateProps {
  devices: Device[]
}

interface DispatchProps {
  toggleDevice: toggleDeviceInterface
}

type Props = StateProps & DispatchProps;

const ListDevicesPage: React.FC<Props> = ({ devices, toggleDevice }) => (
  <div className={styles.list_page}>
    {devices.length === 0 ? (
      <div className={styles.empty_page}>
        <p>You don't have any devices</p>
        <p>Add one to start</p>
      </div>
    ) : devices.map(device => (
      <DeviceListing
        device={device}
        toggleDevice={toggleDevice}
        key={device.id}
      />
    ))}
    <Link to="/addDevice" className={styles.addBtn} >
      <AddBtn />
    </Link>
  </div>
);

const mapStateToProps = (state: AppState): StateProps => ({
  devices: state.devices,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  toggleDevice: (id: string) => dispatch(toggleDevice(id)),
})

export default connect<StateProps, DispatchProps, {}, AppState>
  (mapStateToProps, mapDispatchToProps)(ListDevicesPage);
