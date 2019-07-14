import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { ReactComponent as AddBtn } from './add.svg';
import GestureListing from './GestureListing';
import { AppState } from '../../store';
import { Gesture } from '../../store/gestures/types';
import styles from './index.module.scss';

interface StateProps {
  gestures: Gesture[]
}

type Props = StateProps;

const ListGesturesPage: React.FC<Props> = ({ gestures }) => (
  <div className={styles.list_page}>
    { gestures.length === 0 ? (
      <div className={styles.empty_page}>
        <p>You don't have any gestures</p>
        <p>Add one to start</p>
      </div>
    ) : gestures.map(gesture => (
      <GestureListing gesture={gesture} key={gesture.id} />
    )) }
    <Link to="/addGesture" className={styles.addBtn} >
      <AddBtn />
    </Link>
  </div>
);

const mapStateToProps = (state: AppState): StateProps => ({
  gestures: state.gestures,
});

export default connect<StateProps, {}, {}, AppState>
  (mapStateToProps)(ListGesturesPage);
