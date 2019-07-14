import {
  TOGGLE_SETTING,
  SettingsActionTypes,
  SettingTypes
} from './types';

export const toggleSetting = (setting: SettingTypes): SettingsActionTypes => ({
  type: TOGGLE_SETTING,
  setting,
});
