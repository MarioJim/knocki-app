import {
  Settings,
  TOGGLE_SETTING,
  SettingsActionTypes
} from './types';

const initialState: Settings = {
  sendAnalytics: true,
  sendInteractions: true,
  allowLocation: true,
  allowNotifications: true,
};

export default (
  state = initialState,
  action: SettingsActionTypes
): Settings => {
  switch (action.type) {
    case TOGGLE_SETTING:
      const newState = { ...state, };
      newState[action.setting] = !state[action.setting];
      return newState;
    default:
      return state;
  }
}
