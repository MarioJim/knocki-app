import { createStore, combineReducers } from 'redux';

import devicesReducer from './devices/reducer';
import gesturesReducer from './gestures/reducer';
import settingsReducer from './settings/reducer';

const rootReducer = combineReducers({
  devices: devicesReducer,
  gestures: gesturesReducer,
  settings: settingsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default () => {
  const store = createStore(
    rootReducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
}
