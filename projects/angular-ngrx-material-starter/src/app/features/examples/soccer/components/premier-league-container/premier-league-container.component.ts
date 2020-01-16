import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SoccerState } from '../../soccer.model';
import { State } from '../../../examples.state';
import { selectSoccer } from '../../soccer.selectors';
import { actionPlayerBarGroupList } from '../../soccer.actions';

@Component({
  selector: 'cds-premier-league-container',
  templateUrl: './premier-league-container.component.html',
  styleUrls: ['./premier-league-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PremierLeagueContainerComponent implements OnInit {
  soccer$: Observable<SoccerState>;

  constructor(public store: Store<State>) {}

  ngOnInit() {
    this.soccer$ = this.store.pipe(select(selectSoccer));
    this.store.dispatch(actionPlayerBarGroupList());
    setTimeout(() => {
      console.log('HELLO!');
    }, 300);
  }
}

// {
//   "id": 3,
//   "time_created": "2019-11-22T16:40:24.552870Z",
//   "time_updated": "2019-11-22T16:40:24.552905Z",
//   "club": "Arsenal",
//   "name": "Pierre-Emerick Aubameyang",
//   "club_logo": "https://res.cloudinary.com/skill-match/image/upload/v1573339359/ClearDataSports/EPL_Logos/arsenal.svg",
//   "position": "AM/W",
//   "att2": 0.55,
//   "def2": 0.02,
//   "shot2": 0.33,
//   "pass2": 0.22,
//   "takeon2": 0.0,
//   "att": 226.0,
//   "defense": 23.0,
//   "passer": 120.0,
//   "pvar": 0.1,
//   "ovr": 0.57,
//   "adj_att": 0.43,
//   "adj_def": 0.03,
//   "x_g": 0.85,
//   "ags": 0.572,
//   "x_a": 0.13,
//   "x_gc": 0.97
// }

//   "pvar2": 0.1,
