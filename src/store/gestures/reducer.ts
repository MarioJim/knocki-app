import {
  Gesture,
  ADD_GESTURE,
  EDIT_GESTURE,
  REMOVE_GESTURE,
  GestureActionTypes
} from './types';

const initialState: Gesture[] = [];

export default (
  state = initialState,
  action: GestureActionTypes
): Gesture[] => {
  switch (action.type) {
    case ADD_GESTURE:
      return [ ...state, action.gesture ];
    case EDIT_GESTURE:
      return state.map(gesture =>
        (gesture.id === action.id) ? { ...gesture, ...action.updatedGesture } : gesture
      );
    case REMOVE_GESTURE:
      return state.filter(({ id }) => id !== action.id);
    default:
      return state;
  }
}
