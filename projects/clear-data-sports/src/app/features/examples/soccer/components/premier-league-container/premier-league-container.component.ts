import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
  tap
} from 'rxjs/operators';

import { ListResponse, Player, PlayerBarGroup } from '../../soccer.model';
import { State } from '../../../examples.state';
import {
  selectPlayerBarGroupList,
  selectPlayerBarList,
  selectSoccerLoading
} from '../../soccer.selectors';
import {
  actionPlayerBarGroupList,
  actionPlayerBarList
} from '../../soccer.actions';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SoccerService } from '../../soccer.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../../core/animations/route.animations';

@Component({
  selector: 'cds-premier-league-container',
  templateUrl: './premier-league-container.component.html',
  styleUrls: ['./premier-league-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PremierLeagueContainerComponent
  implements OnInit, AfterViewInit, OnDestroy {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  playerBarListSub$: Subscription;
  playerBarGroupListSub$: Subscription;
  playerBarGroupList: PlayerBarGroup[] = [];
  players$: Observable<Player[]>;
  playerList: Player[] = [];
  form: FormGroup;
  searchPlayersCtrl = new FormControl();
  loading$: Observable<boolean>;
  dataSource = new MatTableDataSource();
  columnDefinitions = [
    { def: 'date', show: true, display_name: 'Date', description: '' },
    { def: 'club', show: true, display_name: 'Club', description: '' },
    { def: 'opponent', show: false, display_name: 'Opponent', description: '' },
    { def: 'name', show: true, display_name: 'Name', description: '' },
    { def: 'position', show: true, display_name: 'Position', description: '' },
    {
      def: 'att2',
      show: false,
      display_name: 'ATT2',
      description: 'Attacking BAR value per 90 minutes played'
    },
    {
      def: 'def2',
      show: false,
      display_name: 'DEF2',
      description: 'Defensive BAR value per 90 minutes played'
    },
    {
      def: 'shot2',
      show: false,
      display_name: 'SHOT2',
      description: 'Shooting BAR value per 90 minutes played'
    },
    {
      def: 'pass2',
      show: false,
      display_name: 'PASS2',
      description: 'Passing BAR value per 90 minutes played'
    },
    {
      def: 'takeon2',
      show: false,
      display_name: 'TAKEON2',
      description: 'Take-on BAR value per 90 minutes played'
    },
    {
      def: 'att',
      show: true,
      display_name: 'ATT',
      description: 'Attacking BAR value per 90 minutes played scaled to 100'
    },
    {
      def: 'defense',
      show: true,
      display_name: 'DEF',
      description: 'Defensive BAR value per 90 minutes played scaled to 100'
    },
    {
      def: 'passer',
      show: true,
      display_name: 'PASS',
      description: 'Passing BAR value per 90 minutes played scaled to 100'
    },
    {
      def: 'pvar',
      show: true,
      display_name: 'PVAR',
      description: 'Points Value Above Replacement per 90 minutes played'
    },
    {
      def: 'ovr',
      show: false,
      display_name: 'OVR',
      description:
        'Attacking BAR value + Defensive BAR value per 90 minutes played'
    },
    {
      def: 'adj_att',
      show: false,
      display_name: 'AdjATT',
      description:
        'Attacking BAR value per 90 minutes played adjusted for position'
    },
    {
      def: 'adj_def',
      show: false,
      display_name: 'AdjDEF',
      description:
        'Defensive BAR value per 90 minutes played adjusted for position'
    },
    {
      def: 'x_g',
      show: false,
      display_name: 'xG',
      description: 'Projected Expected Goals'
    },
    {
      def: 'ags',
      show: true,
      display_name: 'AGS',
      description: 'Probability to score at least 1 goal based on xG'
    },
    {
      def: 'x_a',
      show: false,
      display_name: 'xA',
      description: 'Projected Expected Assists'
    },
    {
      def: 'x_gc',
      show: false,
      display_name: 'xGC',
      description: 'Projected Goal Contributions (xG - xA)'
    },
    {
      def: 'goals',
      show: true,
      display_name: 'xGC',
      description: 'Goals Scored'
    }
  ];

  constructor(
    public store: Store<State>,
    private soccerService: SoccerService,
    private ref: ChangeDetectorRef,
    private fb: FormBuilder
  ) {}

  private initForm() {
    this.form = this.fb.group({
      player: [''],
      group: ['']
    });
  }

  resetForm() {
    this.form.reset();
    this.ref.detectChanges();
  }

  updateFormPlayer(event) {
    this.form.get('player').setValue(event.source.value);
  }

  // updateFormPlayerBarGroup(event) {
  //   console.log('update matchweek event', event);
  //   this.form.get('group').patchValue(event.source.value);
  //   console.log(this.form);
  // }
  onSubmit() {
    console.log('Form', this.form);
    const playerId = this.form.get('player').value;
    const groupId = this.form.get('group').value;
    this.store.dispatch(
      actionPlayerBarList({ player_id: playerId, group_id: groupId })
    );
  }

  ngOnDestroy(): void {
    this.playerBarListSub$.unsubscribe();
    this.playerBarGroupListSub$.unsubscribe();
  }

  ngOnInit() {
    this.loading$ = this.store.pipe(select(selectSoccerLoading));
    this.initForm();
    this.playerBarGroupListSub$ = this.store
      .pipe(select(selectPlayerBarGroupList))
      .subscribe(
        value => {
          if (value) {
            this.playerBarGroupList = value;
          }
        },
        err => console.error(err)
      );
    this.playerBarListSub$ = this.store
      .pipe(select(selectPlayerBarList))
      .subscribe(
        value => {
          if (value) {
            this.dataSource.data = value;
          }
        },
        err => console.error(err)
      );
    this.store.dispatch(actionPlayerBarGroupList());
    this.store.dispatch(actionPlayerBarList({}));
    this.players$ = this.searchPlayersCtrl.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter(t => !!t),
      switchMap(value => {
        return this.soccerService.getPlayers(value);
      }),
      map((res: ListResponse) => {
        this.playerList = res.results;
        return res.results;
      })
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  stopDefaultEnter(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  onCheckBoxChange(event) {
    const columnDefs = this.columnDefinitions.slice();
    const selected = columnDefs.find(v => v.def === event.source.value);
    selected.show = event.checked;
    this.columnDefinitions = columnDefs;
    this.ref.detectChanges();
  }

  getDisplayedColumns(): string[] {
    return this.columnDefinitions.filter(cd => cd.show).map(cd => cd.def);
  }

  displayFn(player_id?: number): string | null {
    console.log('displayFn ', player_id);
    console.log('playerList displayFn', this.playerList);
    if (this.playerList && this.playerList.length) {
      const player = this.playerList.find(p => p.id === player_id);
      console.log('player', player);
      return player ? player.full_name : null;
    }

    if (this.form && !this.form.get('player').value) {
      return null;
    }
    return null;
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
