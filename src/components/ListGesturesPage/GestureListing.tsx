import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as EmptySvg } from './empty.svg';
import { ReactComponent as FullSvg } from './full.svg';
import { Gesture } from '../../store/gestures/types';
import styles from './GestureListing.module.scss';

interface Props {
  gesture: Gesture
}

const GestureListing: React.FC<Props> = ({ gesture }) => (
  <div className={styles.gesture}>
    <Link to={`/editGesture/${gesture.id}`}>
      <h3>{gesture.name}</h3>
      <div>
        {gesture.pattern.map((tap, index) =>
          tap ?
            <FullSvg key={index} /> :
            <EmptySvg key={index} />)}
      </div>
    </Link>
  </div>
);

export default GestureListing;
