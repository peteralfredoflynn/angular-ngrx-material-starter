import { SoccerState } from './soccer.model';
import {
  actionPlayerList,
  actionPlayerListSuccess,
  actionPlayerListError,
  actionPlayerBarGroupList,
  actionPlayerBarGroupListError,
  actionPlayerBarGroupListSuccess,
  actionPlayerBarList,
  actionPlayerBarListSuccess,
  actionPlayerBarListError
} from './soccer.actions';
import { Action, createReducer, on } from '@ngrx/store';

export const initialState: SoccerState = {
  playerBarGroups: [],
  playerList: [],
  player: null,
  loading: false,
  testData: {
    thing: 'hello',
    other_thing: 'world'
  }
};

const reducer = createReducer(
  initialState,
  on(actionPlayerList, state => ({
    ...state,
    loading: true,
    player: null,
    error: null
  })),
  on(actionPlayerListSuccess, (state, { playerList }) => {
    console.log('STATE FROM REDUCER', state);
    console.log('PLAYER LIST FROM REDUCER', playerList);
    return {
      ...state,
      loading: false,
      playerList,
      error: null
    };
  }),
  on(actionPlayerListError, (state, { error }) => ({
    ...state,
    loading: false,
    player: null,
    error: error
  })),
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
  })),
  on(actionPlayerBarList, state => ({
    ...state,
    loading: true,
    playerBarList: null,
    error: null
  })),
  on(actionPlayerBarListSuccess, (state, { playerBarList }) => ({
    ...state,
    loading: false,
    playerBarList: playerBarList,
    error: null
  })),
  on(actionPlayerBarListError, (state, { error }) => ({
    ...state,
    loading: false,
    playerBarList: null,
    error
  }))
);

export function soccerReducer(state: SoccerState | undefined, action: Action) {
  return reducer(state, action);
}
