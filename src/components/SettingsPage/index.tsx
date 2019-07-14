import React from 'react';
import { connect } from 'react-redux';
import Toggle from 'react-toggle';
import { Dispatch } from 'redux';

import { AppState } from '../../store';
import { toggleSetting } from '../../store/settings/actions';
import { SettingTypes, Settings } from '../../store/settings/types';
import styles from './index.module.scss';

type SettingsLookupMapType = [ SettingTypes, string ];

const settingsLookupMap: SettingsLookupMapType[] = [
  [ 'sendAnalytics', 'Send technical data to our servers' ],
  [ 'sendInteractions', 'Send interaction data to our servers' ],
  [ 'allowLocation', 'Allow use of your location' ],
  [ 'allowNotifications', 'Allow notifications' ],
];

interface StateProps {
  settings: Settings
}

interface DispatchProps {
  toggleSetting: Function
}

type Props = StateProps & DispatchProps;

const SettingsPage: React.FC<Props> = (props) => (
  <div className={styles.page}>
    <div>
      {settingsLookupMap.map(([ settingName, settingText ]) => (
        <div key={settingName} className={styles.settings_row}>
          <p>{settingText}</p>
          <Toggle 
            defaultChecked={props.settings[settingName]}
            icons={false}
            onChange={() => { props.toggleSetting(settingName); }}
          />
        </div>
      ))}
    </div>
  </div>
);

const mapStateToProps = (state: AppState): StateProps => ({
  settings: state.settings,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  toggleSetting: (settingName: SettingTypes) => dispatch(toggleSetting(settingName)),
});

export default connect<StateProps, DispatchProps, {}, AppState>
  (mapStateToProps, mapDispatchToProps)(SettingsPage);
