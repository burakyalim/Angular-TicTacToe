import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { OneComponent } from './one/one.component';
import { TwoComponent } from './two/two.component';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'one', component: OneComponent },
  { path: 'two', component: TwoComponent }
]; 

@NgModule({
  declarations: [
    AppComponent,
    OneComponent,
    TwoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
