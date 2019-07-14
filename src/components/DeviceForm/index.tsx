import React from 'react';
import { connect } from 'react-redux';
import { History } from 'history';

import GestureToggle from './GestureToggle';
import { ReactComponent as LocationSVG } from './location.svg';
import { ReactComponent as SurfaceSVG } from './surface.svg';
import { AppState } from '../../store';
import { Device } from '../../store/devices/types';
import { Gesture } from '../../store/gestures/types';
import styles from './index.module.scss';

export interface onSubmitDeviceInterface {
  (device: Device): void
}

interface StateProps {
  gestures: Gesture[]
}

interface OwnProps {
  onSubmit: onSubmitDeviceInterface
  history: History
  editingDevice?: Device
}

type Props = StateProps & OwnProps;

interface State {
  device: Device
  error: string
}

class DeviceForm extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    if (props.editingDevice) {
      this.state = {
        device: props.editingDevice,
        error: '',
      };
    } else {
      const gestureToggles: { [key:string]: boolean } = {};
      props.gestures.forEach(gesture => {
        gestureToggles[gesture.id] = true;
      });
      this.state = {
        device: {
          room: '',
          surface: '',
          id: '',
          isOn: true,
          gestureToggles,
        },
        error: '',
      };
    }
  }

  private onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { room, surface } = this.state.device;
    if (!room) {
      this.setState(() => ({ error: 'Please provide a room name', }));
    } else if (!surface) {
      this.setState(() => ({ error: 'Please provide a surface name', }));
    } else {
      this.setState(() => ({ error: '', }));
      this.props.onSubmit(this.state.device);
      this.props.history.push('/devices');
    }
  }

  private onReset = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.history.push('/devices');
  }

  private onRoomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const room = event.target.value;
    this.setState((prevState: State) => ({
      ...prevState,
      device: { ...prevState.device, room, },
    }));
  }

  private onSurfaceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const surface = event.target.value;
    this.setState((prevState: State) => ({
      ...prevState,
      device: { ...prevState.device, surface, },
    }));
  }

  toggleGesture = (gestureID: string) => {
    this.setState((prevState: State) => ({
      ...prevState,
      device: {
        ...prevState.device,
        gestureToggles: {
          ...prevState.device.gestureToggles,
          [gestureID]: !prevState.device.gestureToggles[gestureID],
        },
      },
    }));
  }

  public render() {
    const { error, device } = this.state;
    return (
      <React.Fragment>
        <h3 className={styles.subtitle}>Configure your Knocki device</h3>
        { error && <p className={styles.error}>{error}</p> }
        <form onSubmit={this.onSubmit} onReset={this.onReset}>
          <div className={styles.icon_and_text}>
            <div>
              <LocationSVG />
            </div>
            <div>
              <h4>Room</h4>
              <input
                type="text"
                value={device.room}
                onChange={this.onRoomChange}
              />
            </div>
          </div>
          <div className={styles.icon_and_text}>
            <div>
              <SurfaceSVG />
            </div>
            <div>
              <h4>Surface</h4>
              <input
                type="text"
                value={device.surface}
                onChange={this.onSurfaceChange}
              />
            </div>
          </div>
          <h3 className={styles.subtitle}>Toggle your gestures</h3>
          <div className={styles.gesture_toggles}>
            { this.props.gestures.length === 0 ? (
              <p>You don't have gestures</p>
            ) : this.props.gestures.map(gesture => (
              <GestureToggle
                key={gesture.id}
                gesture={gesture}
                isOn={this.state.device.gestureToggles[gesture.id]}
                onToggle={this.toggleGesture}
              />
            )) }
          </div>
          <button type="submit" className={styles.done_btn}>Done</button>
          <button type="reset" className={styles.cancel_btn}>Cancel</button>
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  gestures: state.gestures,
});

export default connect<StateProps, {}, {}, AppState>
  (mapStateToProps)(DeviceForm);
