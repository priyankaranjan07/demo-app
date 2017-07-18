import { Component } from '@angular/core';

@Component({
  template: `
    <ion-header>
     <ion-navbar>
        <button ion-button menuToggle>
          <ion-icon name="menu"></ion-icon>
        </button>
        <ion-title>Page1</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content padding>
      <h1>Page1</h1> 
    </ion-content>
  `
})

export class Page1 {
}


  