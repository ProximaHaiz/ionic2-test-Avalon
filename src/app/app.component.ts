import {Component, ViewChild} from "@angular/core";
import {Events, MenuController, Nav, Platform} from "ionic-angular";
import {SplashScreen} from "@ionic-native/splash-screen";
import {Storage} from "@ionic/storage";
import {TabsPage} from "../pages/tabs/tabs";
import {UserData} from "../providers/user-data";
import {CompanyService} from "../providers/company.service";
import {Companies} from "../interface/companies.interface";
import CompanyQueryService from "../providers/companies-query.service";

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabComponent?: any;
}


@Component({
  templateUrl: 'app.template.html'
})
export class ConferenceApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  companies: Companies[];
  goods: string[];
  queryList: Set<string>;

  constructor(public events: Events,
              public userData: UserData,
              public menu: MenuController,
              public platform: Platform,
              public storage: Storage,
              public splashScreen: SplashScreen,
              public companyService: CompanyService,
              private companyQueryService: CompanyQueryService) {
    this.queryList = new Set<string>();
    this.getAllCompanies();

    this.rootPage = TabsPage;

  }

  addToQueryList(query: string) {
    if (this.queryList.has(query)) {
      this.queryList.delete(query);
    } else {
      this.queryList.add(query);
    }
    console.log(this.queryList);
    let queryStringArray: string[] = [];
    this.queryList.forEach(item => {
      queryStringArray.push(item)
    });
    this.companyQueryService.setQuery(queryStringArray);
  }


  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }


  getAllCompanies() {
    this.companyService.getCompanies().subscribe(
      response => {
        this.companies = response.success;
        console.log(this.companies);
        this.goods = [];
        this.goods = this.companyService.getCompaniesGoods(this.companies);
      },
      error => {

      }
    );
  }
}
