import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SettingsItem} from '../../model/settings';
import {GameService} from '../../services/game.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-main-page-header',
  templateUrl: './main-page-header.component.html',
  styleUrls: ['./main-page-header.component.scss']
})
export class MainPageHeaderComponent {

  @Input()
  settings: SettingsItem[];

  @Input()
  playButtonText: string;

  @Output()
  play: EventEmitter<string>;

  @Output()
  selectedSettings: EventEmitter<SettingsItem>;

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    mode: new FormControl('', [Validators.required]),
  });

  get name() {
    return this.formGroup.get('name');
  }

  get mode() {
    return this.formGroup.get('mode');
  }

  constructor() {
    this.selectedSettings = new EventEmitter<SettingsItem>();
    this.play = new EventEmitter<string>();
  }

  onSubmit() {
    this.selectedSettings.emit(this.mode.value);
    this.play.emit(this.name.value);
  }

}
