import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Winner} from '../model/winner';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Settings} from '../model/settings';

@Injectable()
export class WinnersService {
  constructor(private http: HttpClient) {
  }

  getList(): Observable<Winner[]> {
    return this.http.get<Winner[]>(`${environment.api}winners`);
  }

  post(data: Winner): Observable<Winner[]> {
    return this.http.post<Winner[]>(`${environment.api}winners`, data);
  }
}
