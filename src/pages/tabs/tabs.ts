import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import {CompanyListPage} from "../company-list/company-list";



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = CompanyListPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
