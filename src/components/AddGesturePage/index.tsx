import React from 'react';
import { Dispatch } from 'redux';


import GestureForm, { onSubmitGestureInterface } from '../GestureForm';
import styles from './index.module.scss';
import { RouteChildrenProps } from 'react-router';
import { addGesture } from '../../store/gestures/actions';
import { Gesture } from '../../store/gestures/types';
import { connect } from 'react-redux';
import { AppState } from '../../store';

interface DispatchProps {
  onSubmit: onSubmitGestureInterface
}

interface OwnProps extends RouteChildrenProps {}

type Props = DispatchProps & OwnProps;

const AddGesturePage: React.FC<Props> = ({ onSubmit, history }) => (
  <div className={styles.page}>
    <GestureForm
      onSubmit={onSubmit}
      history={history}
    />
  </div>
);

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onSubmit: (newGesture: Gesture) => dispatch(addGesture(newGesture)),
})

export default connect<{}, DispatchProps, OwnProps, AppState>
  (undefined, mapDispatchToProps)(AddGesturePage);
