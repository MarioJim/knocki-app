export type AppTypes = 'facebook' | 'gmail' | 'harmony' | 'hue' | 'ifttt' | 'lifx' | 'nest' | 'smartthings' | 'sms' | 'sonos' | 'tplink' | 'twitter' | 'wemo';

export interface Gesture {
  name: string
  app: AppTypes
  pattern: boolean[]
  id: string
}

export const ADD_GESTURE = 'ADD_GESTURE';
export const EDIT_GESTURE = 'EDIT_GESTURE';
export const REMOVE_GESTURE = 'REMOVE_GESTURE';

export interface AddGestureAction {
  type: typeof ADD_GESTURE
  gesture: Gesture
}

interface EditGestureAction {
  type: typeof EDIT_GESTURE
  id: string
  updatedGesture: Gesture
}

export interface RemoveGestureAction {
  type: typeof REMOVE_GESTURE
  id: string
}

export type GestureActionTypes = AddGestureAction | EditGestureAction | RemoveGestureAction;
