import {
  Device,
  ADD_DEVICE,
  EDIT_DEVICE,
  REMOVE_DEVICE,
  TOGGLE_DEVICE,
  DeviceActionTypes
} from './types';
import { ADD_GESTURE, REMOVE_GESTURE } from '../gestures/types';

const initialState: Device[] = [];

export default (
  state = initialState,
  action: DeviceActionTypes,
): Device[] => {
  switch (action.type) {
    case ADD_DEVICE:
      return [...state, action.device];
    case EDIT_DEVICE:
      return state.map(device =>
        (device.id === action.id) ? { ...device, ...action.updatedDevice } : device
      );
    case REMOVE_DEVICE:
      return state.filter(({ id }) => id !== action.id);
    case TOGGLE_DEVICE:
      return state.map(device =>
        (device.id === action.id) ? { ...device, isOn: !device.isOn } : device
      );
    case ADD_GESTURE:
      return state.map(device => {
        device.gestureToggles[action.gesture.id] = true;
        return device;
      });
    case REMOVE_GESTURE:
      return state.map(device => {
        delete device.gestureToggles[action.id];
        return device;
      });
    default:
      return state;
  }
}
