import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Settings, SettingsItem} from '../model/settings';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class SettingsService {
  constructor(private http: HttpClient) {
  }

  get(): Observable<SettingsItem[]> {
    return this.http.get<Settings>(`${environment.api}game-settings`)
      .pipe(
        map(
          (resp: Settings) => Object.keys(resp).map(k => {
            const item: SettingsItem = {
              delay: resp[k].delay,
              name: k,
              field: resp[k].field,
            };
            return item;
          })
        ));
  }
}
