import React from 'react';
import Toggle from 'react-toggle';

import { Gesture } from '../../store/gestures/types';
import 'react-toggle/style.css';

export interface onToggleInterface {
  (gestureID: string): void
}

interface Props {
  gesture: Gesture
  onToggle: onToggleInterface
  isOn: boolean
}

const GestureToggle: React.FC<Props> = (props: Props) => {
  const { gesture, onToggle, isOn } = props;
  return (
    <div>
      <h4>{gesture.name}</h4>
      <Toggle
        defaultChecked={isOn}
        icons={false}
        onChange={() => { onToggle(gesture.id); }}
      />
    </div>
  );
}

export default GestureToggle;
