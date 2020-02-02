import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app.routing';

import {AppComponent} from './app.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MainPageHeaderComponent} from './components/main-page-header/main-page-header.component';
import {GameFieldComponent} from './components/game-field/game-field.component';
import {LeaderBoardComponent} from './components/leader-board/leader-board.component';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule, MatListModule,
  MatSelectModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GameService} from './services/game.service';
import {SettingsService} from './services/settings.service';
import {WinnersService} from './services/winners.service';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    GameFieldComponent,
    LeaderBoardComponent,
    MainPageHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatListModule,
    ReactiveFormsModule,
  ],
  providers: [
    SettingsService,
    WinnersService,
    GameService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
