import { Component } from '@angular/core';
import { Page1 } from "../page1/page1";
import { Page2 } from "../page2/page2";
import { Page3 } from "../page3/page3";




@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  tab1Root = Page1;
  tab2Root = Page2;
  tab3Root = Page3 ;

}