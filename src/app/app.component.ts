import {Component, ViewChild} from "@angular/core";
import {Events, MenuController, Nav, Platform} from "ionic-angular";
import {SplashScreen} from "@ionic-native/splash-screen";
import {Storage} from "@ionic/storage";
import {TabsPage} from "../pages/tabs/tabs";
import {TutorialPage} from "../pages/tutorial/tutorial";
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
    // Check if the user has already seen the tutorial
    this.storage.get('hasSeenTutorial')
      .then((hasSeenTutorial) => {
        if (hasSeenTutorial) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = TutorialPage;
        }
        this.platformReady()
      });
    // load the conference data
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

  openPage(page: PageInterface) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, {tabIndex: page.index}).catch(() => {
        console.log("Didn't set nav root");
      });
    } else {
      this.nav.setRoot(page.component).catch(() => {
        console.log("Didn't set nav root");
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.userData.logout();
      }, 1000);
    }
  }


  // getItems(ev: any) {
  //   // Reset items back to all of the items
  //   this.initializeItems();
  //
  //   // set val to the value of the searchbar
  //   let val = ev.target.value;
  //
  //   // if the value is an empty string don't filter the items
  //   if (val && val.trim() != '') {
  //     this.items = this.items.filter((item) => {
  //       return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
  //     })
  //   }
  // }


  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNav();

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().component === page.component) {
      return 'primary';
    }
    return;
  }
}
