import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';

import DeviceForm, { onSubmitDeviceInterface } from '../DeviceForm';
import { AppState } from '../../store';
import { Device } from '../../store/devices/types';
import { editDevice } from '../../store/devices/actions';
import styles from './index.module.scss';

interface MatchParams {
  id: string
}

interface OwnProps extends RouteComponentProps<MatchParams> { }

interface StateProps {
  editingDevice: Device | undefined
}

interface DispatchProps {
  onSubmit: onSubmitDeviceInterface
}

type Props = OwnProps & StateProps & DispatchProps;

const EditDevicePage: React.FC<Props> = ({ onSubmit, history, editingDevice }) => (
  <div className={styles.page}>
    {editingDevice ? (
      <DeviceForm
        onSubmit={onSubmit}
        history={history}
        editingDevice={editingDevice}
      />
    ) : (
        <div>
          <h2>Error</h2>
          <h4>Device not found</h4>
        </div>
      )}
  </div>
);

const mapStateToProps = (state: AppState, props: OwnProps): StateProps => ({
  editingDevice: state.devices.find(device => device.id === props.match.params.id),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onSubmit: (device: Device) => dispatch(editDevice(device.id, device)),
});

export default connect<StateProps, DispatchProps, OwnProps, AppState>
  (mapStateToProps, mapDispatchToProps)(EditDevicePage);
