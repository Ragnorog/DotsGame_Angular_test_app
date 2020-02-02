import {Component, OnDestroy, OnInit} from '@angular/core';
import {WinnersService} from '../../services/winners.service';
import {SettingsService} from '../../services/settings.service';
import {SettingsItem} from '../../model/settings';
import {Winner} from '../../model/winner';
import {GameService} from '../../services/game.service';
import {Subscription} from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-main',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  settings: SettingsItem[];
  winners: Winner[];

  selectedSettingsItem: SettingsItem;
  gameResultMessage: string;

  gameStarted: boolean;

  subs: Subscription[];

  constructor(private winnersService: WinnersService,
              private settingsService: SettingsService,
              private gameService: GameService) {
    this.subs = [];
  }

  ngOnInit(): void {
    this.loadSettings();
    this.loadWinners();
    const sub = this.gameService.winnerSubject
      .subscribe(winner => {
        this.gameResultMessage = `${winner} won`;

        this.subs.push(
          this.winnersService
            .post({
              date: moment().format('HH:mm; DD MMMM YYYY'),
              winner,
            } as Winner)
            .subscribe(winners => this.winners = winners)
        );
      });
    this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  loadSettings() {
    const sub = this.settingsService.get()
      .subscribe(settings => this.settings = settings);
    this.subs.push(sub);
  }

  loadWinners() {
    const sub = this.winnersService.getList()
      .subscribe(winners => this.winners = winners);
    this.subs.push(sub);
  }

  selectedSettings(item: SettingsItem) {
    this.selectedSettingsItem = item;
    this.gameService.stopGame();
  }

  play(username) {
    if (this.selectedSettingsItem && username) {
      this.gameStarted = true;
      this.gameService.generateGameField(this.selectedSettingsItem.field);
      this.gameService.startGame(
        this.selectedSettingsItem,
        username,
      );
    }
  }
}
