import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Companies} from "../../interface/companies.interface";


/*
 Generated class for the CompanyPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-company-page',
  templateUrl: 'company-page.html'
})
export class CompanyPage {
  company: Companies;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    this.company = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyPagePage');
  }

}
