import { createSelector } from '@ngrx/store';

import { ExamplesState, selectExamples } from '../examples.state';

export const selectSoccer = createSelector(
  selectExamples,
  (state: ExamplesState) => state.soccer
);
