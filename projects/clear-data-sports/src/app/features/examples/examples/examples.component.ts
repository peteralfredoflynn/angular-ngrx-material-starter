import { Store, select } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import {
  routeAnimations,
  selectIsAuthenticated
} from '../../../core/core.module';

import { State } from '../examples.state';

@Component({
  selector: 'cds-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;

  examples = [
    { link: 'soccer', label: 'cds.examples.menu.soccer' },
    // { link: 'todos', label: 'cds.examples.menu.todos' },
    // { link: 'stock-market', label: 'cds.examples.menu.stocks' },
    { link: 'theming', label: 'cds.examples.menu.theming' },
    // { link: 'crud', label: 'cds.examples.menu.crud' },
    {
      link: 'simple-state-management',
      label: 'cds.examples.menu.simple-state-management'
    },
    { link: 'form', label: 'cds.examples.menu.form' },
    { link: 'notifications', label: 'cds.examples.menu.notifications' },
    { link: 'elements', label: 'cds.examples.menu.elements' },
    { link: 'authenticated', label: 'cds.examples.menu.auth', auth: true },
    { link: 'signup', label: 'signup' }
  ];

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
  }
}
