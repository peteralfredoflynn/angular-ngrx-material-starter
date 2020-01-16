import { PlayerBarGroup } from './soccer.model';
import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export const actionPlayerBarGroupList = createAction('[PlayerBarGroup] List');

export const actionPlayerBarGroupListSuccess = createAction(
  '[PlayerBarGroup] List Success',
  props<{ playerBarGroups: any }>()
);

export const actionPlayerBarGroupListError = createAction(
  '[PlayerBarGroup] List Error',
  props<{ error: HttpErrorResponse }>()
);
