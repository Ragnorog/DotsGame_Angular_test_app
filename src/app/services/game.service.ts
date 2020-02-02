import {Injectable} from '@angular/core';
import {Cell} from '../model/cell';
import {Subject} from 'rxjs';
import {randomInteger} from '../util/random';
import {SettingsItem} from '../model/settings';
import {WinnersService} from './winners.service';
import {Winner} from '../model/winner';

@Injectable()
export class GameService {
  public gameFieldSubject: Subject<Cell[]>;
  public winnerSubject: Subject<string>;

  private delay: number;
  private gameField: Cell[];
  private timerId: number;
  private username: string;

  constructor(private winnersService: WinnersService) {
    this.gameFieldSubject = new Subject<Cell[]>();
    this.winnerSubject = new Subject<string>();
  }

  generateGameField(rowLength: number) {
    const cellsCount = rowLength * rowLength;
    this.gameField = Array.from({length: cellsCount})
      .map(c => (
        {
          active: false,
          playerGot: false,
          used: false,
        } as Cell
      ));
    this.gameFieldSubject.next(this.gameField);
  }

  nextTurn() {
    const unusedCells = this.gameField.filter(c => !c.used);
    if (unusedCells && unusedCells.length > this.gameField.length / 2) {
      const index = randomInteger(0, unusedCells.length - 1);
      const unusedCell = unusedCells[index];
      unusedCell.active = true;
      this.timerId = setTimeout(() => {
        if (unusedCell.active) {
          this.updateCell(unusedCell);
        }
      }, this.delay);
    } else {
      const playerCellsCount = this.gameField
        .map(c => +c.playerGot)
        .reduce((res, val) => res + val);
      const computerCellsCount = this.gameField.length - unusedCells.length - playerCellsCount;
      const isPlayerWon = playerCellsCount > computerCellsCount;
      const winner: string = isPlayerWon ? this.username : 'computer';
      this.winnerSubject.next(winner);
    }
  }

  cellClick(cell: Cell) {
    if (cell.active) {
      this.updateCell(cell, true);
    }
  }

  startGame(settings: SettingsItem, username: any) {
    this.delay = settings.delay;
    this.username = username;
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.generateGameField(settings.field);
    this.nextTurn();
  }

  stopGame() {
    clearTimeout(this.timerId);
    this.gameField = null;
    this.gameFieldSubject.next(this.gameField);
  }

  private updateCell(cell: Cell, isPlayerGot: boolean = false) {
    cell.used = true;
    cell.active = false;
    cell.playerGot = isPlayerGot;
    clearTimeout(this.timerId);
    this.nextTurn();
  }
}
