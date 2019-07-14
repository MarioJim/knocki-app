import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router-dom';

import DeviceForm, { onSubmitDeviceInterface } from '../DeviceForm';
import { AppState } from '../../store';
import { Device } from '../../store/devices/types';
import { addDevice } from '../../store/devices/actions';
import styles from './index.module.scss';

interface DispatchProps {
  onSubmit: onSubmitDeviceInterface
}

interface OwnProps extends RouteComponentProps {}

type Props = DispatchProps & OwnProps;

const AddDevicePage: React.FC<Props> = ({ onSubmit, history }) => (
  <div className={styles.page}>
    <DeviceForm 
      onSubmit={onSubmit}
      history={history}
    />
  </div>
);

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onSubmit: (newDevice: Device) => dispatch(addDevice(newDevice)),
});

export default connect<{}, DispatchProps, OwnProps, AppState>
  (undefined, mapDispatchToProps)(AddDevicePage);
