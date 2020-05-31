import { AddGestureAction, RemoveGestureAction } from '../gestures/types';

export interface Device {
  room: string
  surface: string
  isOn: boolean
  gestureToggles: {
    [key: string]: boolean
  }
  id: string
}

export const ADD_DEVICE = 'ADD_DEVICE';
export const EDIT_DEVICE = 'EDIT_DEVICE';
export const REMOVE_DEVICE = 'REMOVE_DEVICE';
export const TOGGLE_DEVICE = 'TOGGLE_DEVICE';
export const TOGGLE_GESTURE = 'TOGGLE_GESTURE';

interface AddDeviceAction {
  type: typeof ADD_DEVICE
  device: Device
}

interface EditDeviceAction {
  type: typeof EDIT_DEVICE
  id: string
  updatedDevice: Device
}

interface RemoveDeviceAction {
  type: typeof REMOVE_DEVICE
  id: string
}

interface ToggleDeviceAction {
  type: typeof TOGGLE_DEVICE
  id: string
}

interface ToggleGestureAction {
  type: typeof TOGGLE_GESTURE
  gestureID: string
}

export type DeviceActionTypes = AddDeviceAction |
  EditDeviceAction |
  RemoveDeviceAction |
  ToggleDeviceAction |
  AddGestureAction |
  RemoveGestureAction |
  ToggleGestureAction;
