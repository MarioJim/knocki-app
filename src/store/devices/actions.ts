import uuid from 'uuid/v4';

import {
  Device,
  ADD_DEVICE,
  EDIT_DEVICE,
  REMOVE_DEVICE,
  TOGGLE_DEVICE,
  DeviceActionTypes
} from './types';

export const addDevice = (newDevice: Device): DeviceActionTypes => ({
  type: ADD_DEVICE,
  device: {
    ...newDevice,
    id: uuid(),
  },
});

export const editDevice = (id: string, updatedDevice: Device): DeviceActionTypes => ({
  type: EDIT_DEVICE,
  id,
  updatedDevice,
});

export const removeDevice = (id: string): DeviceActionTypes => ({
  type: REMOVE_DEVICE,
  id,
});

export const toggleDevice = (id: string): DeviceActionTypes => ({
  type: TOGGLE_DEVICE,
  id,
});
