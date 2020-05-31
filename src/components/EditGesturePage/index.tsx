import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';

import GestureForm, { onSubmitGestureInterface } from '../GestureForm';
import { AppState } from '../../store';
import { Gesture } from '../../store/gestures/types';
import { editGesture } from '../../store/gestures/actions';
import styles from './index.module.scss';

interface MatchParams {
  id: string
}

interface OwnProps extends RouteComponentProps<MatchParams> { }

interface StateProps {
  editingGesture: Gesture | undefined
}

interface DispatchProps {
  onSubmit: onSubmitGestureInterface
}

type Props = OwnProps & StateProps & DispatchProps;

const EditGesturePage: React.FC<Props> = ({ onSubmit, history, editingGesture }) => (
  <div className={styles.page}>
    {editingGesture ? (
      <GestureForm
        onSubmit={onSubmit}
        history={history}
        editingGesture={editingGesture}
      />
    ) : (
        <div>
          <h2>Error</h2>
          <h4>Gesture not found</h4>
        </div>
      )}
  </div>
);

const mapStateToProps = (state: AppState, props: OwnProps): StateProps => ({
  editingGesture: state.gestures.find(gesture => gesture.id === props.match.params.id),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onSubmit: (gesture: Gesture) => dispatch(editGesture(gesture.id, gesture)),
});

export default connect<StateProps, DispatchProps, OwnProps, AppState>
  (mapStateToProps, mapDispatchToProps)(EditGesturePage);
