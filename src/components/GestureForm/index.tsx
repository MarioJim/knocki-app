import React from 'react';
import LongPressable from 'react-longpressable';
import { History } from 'history';

import { ReactComponent as EmptySvg } from './empty.svg';
import { ReactComponent as FullSvg } from './full.svg';
import { ReactComponent as TagSvg } from './tag.svg';
import { ReactComponent as BackspaceBtn } from './backspace-arrow.svg';
import { Gesture, AppTypes } from '../../store/gestures/types';
import styles from './index.module.scss';
import { AppState } from '../../store';
import { connect } from 'react-redux';

type SelectLookupMapType = {
  [key in AppTypes]: string;
}

const selectLookupMap: SelectLookupMapType = {
  facebook: 'Facebook',
  gmail: 'Gmail',
  harmony: 'Harmony',
  hue: 'Hue',
  ifttt: 'IFTTT',
  lifx: 'Lifx',
  nest: 'Nest',
  smartthings: 'SmartThings',
  sms: 'SMS',
  sonos: 'Sonos',
  tplink: 'TP-Link',
  twitter: 'Twitter',
  wemo: 'Wemo',
}

export interface onSubmitGestureInterface {
  (gesture: Gesture): void
}

interface StateProps {
  gestures: Gesture[]
}

interface OwnProps {
  onSubmit: onSubmitGestureInterface
  history: History
  editingGesture?: Gesture
}

type Props = StateProps & OwnProps;

interface State {
  gesture: Gesture
  error: string
}

class GestureForm extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    if (props.editingGesture) {
      this.state = {
        gesture: props.editingGesture,
        error: '',
      };
    } else {
      this.state = {
        gesture: {
          name: '',
          app: 'facebook',
          pattern: [],
          id: '',
        },
        error: '',
      };
    }
  }

  private onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, pattern } = this.state.gesture;
    const nameMatch = this.props.gestures.find(gesture => gesture.name === name);
    const patternMatch = this.props.gestures.find((gesture) =>
      gesture.pattern.length === pattern.length &&
      gesture.pattern.every((value, index) => value === pattern[index])
    );
    if (!name) {
      this.setState(() => ({ error: 'Please provide a name for the gesture', }));
    } else if (pattern.length === 0) {
      this.setState(() => ({ error: 'Please provide a pattern', }));
    } else if (nameMatch) {
      this.setState(() => ({ error: 'Another gesture already has this name', }));
    } else if (patternMatch) {
      this.setState(() => ({ error: 'Another gesture already has this pattern', }));
    } else {
      this.setState(() => ({ error: '', }));
      this.props.onSubmit(this.state.gesture);
      this.props.history.push('/gestures');
    }
  }

  private onReset = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.history.push('/gestures');
  }

  private onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    this.setState(prevState => ({
      ...prevState,
      gesture: { ...prevState.gesture, name, },
    }));
  }

  private onAppChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const app = event.target.value as AppTypes;
    this.setState(prevState => ({
      ...prevState,
      gesture: { ...prevState.gesture, app, },
    }));
  }

  private onShortPress = () => {
    this.setState(prevState => ({
      ...prevState,
      gesture: {
        ...prevState.gesture,
        pattern: prevState.gesture.pattern.concat(true),
      },
    }));
  }

  private onLongPress = () => {
    this.setState(prevState => ({
      ...prevState,
      gesture: {
        ...prevState.gesture,
        pattern: prevState.gesture.pattern.concat(false),
      },
    }));
  }

  private onPressBackspace = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    this.setState(prevState => ({
      ...prevState,
      gesture: {
        ...prevState.gesture,
        pattern: prevState.gesture.pattern.slice(0, -1),
      },
    }));
  }

  render() {
    const { error, gesture } = this.state;
    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit} onReset={this.onReset}>
          <h3 className={styles.subtitle}>Configure a gesture</h3>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.icon_and_text}>
            <div>
              <TagSvg />
            </div>
            <div>
              <h4>Name</h4>
              <input
                type="text"
                value={gesture.name}
                onChange={this.onNameChange}
              />
            </div>
          </div>
          <div className={styles.icon_and_select}>
            <img src={`/img/app_icons/${gesture.app}.png`} alt="App icon" />
            <select onChange={this.onAppChange}>
              {Object.entries(selectLookupMap).map(([value, label]) => (
                <option value={value} key={value}>{label}</option>
              ))}
            </select>
          </div>
          <h3 className={styles.subtitle}>Your pattern</h3>
          <div className={styles.enter_pattern}>
            <div>
              {gesture.pattern.map((tap, index) =>
                tap ? <FullSvg key={index} /> : <EmptySvg key={index} />)}
            </div>
            <div onClick={this.onPressBackspace}>
              <BackspaceBtn />
            </div>
          </div>
          <h3 className={styles.subtitle}>Input your gesture here</h3>
          <LongPressable
            onShortPress={this.onShortPress}
            onLongPress={this.onLongPress}
            longPressTime={150}>
            <div className={styles.tapping_area}></div>
          </LongPressable>
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
  (mapStateToProps)(GestureForm);
