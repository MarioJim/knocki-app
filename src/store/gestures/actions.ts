import uuid from 'uuid/v4';

import {
  Gesture,
  ADD_GESTURE,
  EDIT_GESTURE,
  REMOVE_GESTURE,
  GestureActionTypes
} from './types';

export const addGesture = (newGesture: Gesture): GestureActionTypes => ({
  type: ADD_GESTURE,
  gesture: {
    ...newGesture,
    id: uuid(),
  },
});

export const editGesture = (id: string, updatedGesture: Gesture): GestureActionTypes => ({
  type: EDIT_GESTURE,
  id,
  updatedGesture,
});

export const removeGesture = (id: string): GestureActionTypes => ({
  type: REMOVE_GESTURE,
  id,
});
