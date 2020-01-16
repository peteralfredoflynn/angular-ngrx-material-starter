import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SoccerService {
  constructor(private http: HttpClient) {}

  getPlayerBarGroups() {
    if (environment.apiUrl) {
      const url = `${environment.apiUrl}/player-bar-group`;
      return this.http.get(url);
    }
  }

  // retrieveStock(symbol: string): Observable<PlayerBar> {
  //   // would do HTTP  request but is hard to find reliable free stock quote API
  //   const result = this.buildResult(symbol);
  //   return of(result);
  // }
  //
  // private buildResult(symbol: string): PlayerBar {
  //   return {
  //     symbol,
  //     exchange: 'Nasdaq',
  //     last: '124',
  //     ccy: 'USD',
  //     change: '1',
  //     changePositive: true,
  //     changeNegative: false,
  //     changePercent: '0.81'
  //   };
  // }
}
