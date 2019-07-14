export type SettingTypes = 'sendAnalytics' | 'sendInteractions' | 'allowLocation' | 'allowNotifications';

export interface Settings {
  sendAnalytics: boolean
  sendInteractions: boolean
  allowLocation: boolean
  allowNotifications: boolean
}

export const TOGGLE_SETTING = 'TOGGLE_SETTING';

interface ToggleSetting {
  type: typeof TOGGLE_SETTING
  setting: SettingTypes
}

export type SettingsActionTypes = ToggleSetting;
