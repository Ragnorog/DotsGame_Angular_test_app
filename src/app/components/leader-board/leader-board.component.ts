import {Component, Input, OnInit} from '@angular/core';
import {Winner} from '../../model/winner';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.scss']
})
export class LeaderBoardComponent implements OnInit {

  @Input()
  winners: Winner[];

  constructor() {
  }

  ngOnInit() {
  }

}
