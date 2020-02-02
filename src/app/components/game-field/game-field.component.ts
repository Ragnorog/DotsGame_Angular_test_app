import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Cell} from '../../model/cell';
import {GameService} from '../../services/game.service';
import {SettingsItem} from '../../model/settings';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.scss']
})
export class GameFieldComponent implements OnInit, OnDestroy {
  @Input()
  private gameMode: SettingsItem;

  field: Cell[];

  subs: Subscription[];

  constructor(private gameService: GameService) {
    this.subs = [];
  }

  ngOnInit() {
    const sub = this.gameService.gameFieldSubject
      .subscribe(field => this.field = field);
    this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  cellClick(cell: Cell) {
    this.gameService.cellClick(cell);
  }

  getRow(index) {
    if (this.gameMode) {
      return Math.floor(index / this.gameMode.field);
    }
  }
}
