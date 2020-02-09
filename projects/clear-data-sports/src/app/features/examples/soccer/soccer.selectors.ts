import { createSelector, select } from '@ngrx/store';

import { ExamplesState, selectExamples } from '../examples.state';

export const selectSoccer = createSelector(
  selectExamples,
  (state: ExamplesState) => state.soccer
);

export const selectPlayerList = createSelector(
  selectExamples,
  (state: ExamplesState) => state.soccer.playerList
);

export const selectPlayerBarList = createSelector(
  selectExamples,
  (state: ExamplesState) => state.soccer.playerBarList
);

export const selectPlayerBarGroupList = createSelector(
  selectExamples,
  (state: ExamplesState) => state.soccer.playerBarGroups
);

export const selectSoccerLoading = createSelector(
  selectExamples,
  (state: ExamplesState) => state.soccer.loading
);
