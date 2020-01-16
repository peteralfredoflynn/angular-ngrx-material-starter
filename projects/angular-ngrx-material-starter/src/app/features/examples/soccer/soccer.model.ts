import { HttpErrorResponse } from '@angular/common/http';

export interface PlayerBarGroup {
  id: number;
  description: string;
  start_date: string;
  end_date: string;
}

export interface PlayerBar {
  id: number;
  club: string;
  name: string;
  club_logo: string;
  position: string;
  att2: number;
  def2: number;
  shot2: number;
  pass2: number;
  takeon2: number;
  pvar2: number;
  att: number;
  defense: number;
  passer: number;
  pvar: number;
  ovr: number;
  adj_att: number;
  adj_def: number;
  x_g: number;
  ags: number;
  x_a: number;
  x_gc: number;
}

export interface SoccerState {
  loading: boolean;
  playerBarGroups?: any;
  testData?: any;
  error?: HttpErrorResponse;
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
//   "pvar2": 0.1,
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
