import {NgModule} from "@angular/core";

import {IonicApp, IonicModule} from "ionic-angular";
import {IonicStorageModule} from "@ionic/storage";
import {ConferenceApp} from "./app.component";
import {TabsPage} from "../pages/tabs/tabs";
import {UserData} from "../providers/user-data";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {SplashScreen} from "@ionic-native/splash-screen";
import {CompanyService} from "../providers/company.service";
import {CompanyPage} from "../pages/company-page/company-page";
import {CompanyFormPage} from "../pages/company-form/company-form";
import {CompanyListPage} from "../pages/company-list/company-list";
import {SharedModule} from "../shared/shared.module";
import CompanyQueryService from "../providers/companies-query.service";
import CompanyToastService from "../providers/companies-toast.service";


@NgModule({
  declarations: [
    ConferenceApp,
    CompanyListPage,
    TabsPage,
    CompanyPage,
    CompanyFormPage,


  ],
  imports: [
    IonicModule.forRoot(ConferenceApp),
    IonicStorageModule.forRoot(),
    SharedModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    CompanyListPage,
    TabsPage,
    CompanyPage,
    CompanyFormPage
  ],
  providers: [
    UserData,
    InAppBrowser,
    SplashScreen,
    CompanyService,
    CompanyQueryService,
    CompanyToastService
  ]
})
export class AppModule {
}
