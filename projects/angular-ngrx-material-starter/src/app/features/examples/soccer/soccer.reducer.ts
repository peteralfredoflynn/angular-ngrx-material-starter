import { SoccerState } from './soccer.model';
import {
  actionPlayerBarGroupList,
  actionPlayerBarGroupListError,
  actionPlayerBarGroupListSuccess
} from './soccer.actions';
import { Action, createReducer, on } from '@ngrx/store';

export const initialState: SoccerState = {
  playerBarGroups: [],
  loading: false,
  testData: {
    thing: 'hello',
    other_thing: 'world'
  }
};

const reducer = createReducer(
  initialState,
  on(actionPlayerBarGroupList, state => ({
    ...state,
    loading: true,
    playerBarGroups: null,
    error: null
  })),
  on(actionPlayerBarGroupListSuccess, (state, { playerBarGroups }) => ({
    ...state,
    loading: false,
    playerBarGroups: playerBarGroups,
    error: null
  })),
  on(actionPlayerBarGroupListError, (state, { error }) => ({
    ...state,
    loading: false,
    playerBarGroups: null,
    error
  }))
);

export function soccerReducer(state: SoccerState | undefined, action: Action) {
  return reducer(state, action);
}
