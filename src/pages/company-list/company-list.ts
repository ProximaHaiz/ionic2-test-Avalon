import {Component} from "@angular/core";

import {ActionSheet, ActionSheetController, Config, NavController} from "ionic-angular";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {Companies} from "../../interface/companies.interface";
import {CompanyService} from "../../providers/company.service";
import {CompanyPage} from "../company-page/company-page";
import {ModalController} from "../../../node_modules/ionic-angular/components/modal/modal";
import {CompanyFormPage} from "../company-form/company-form";
import {LoadingController} from "../../../node_modules/ionic-angular/components/loading/loading";
import CompanyQueryService from "../../providers/companies-query.service";
import 'rxjs/add/operator/subscribeOn';
import {ToastController} from "../../../node_modules/ionic-angular/components/toast/toast";
import CompanyToastService from "../../providers/companies-toast.service";


@Component({
  selector: 'page-speaker-list',
  templateUrl: 'company-list.html'
})
export class CompanyListPage {
  actionSheet: ActionSheet;
  speakers: any[] = [];
  public queryText: string = '';

  companies: Companies[];
  companiesToDisplay: Companies[];
  goods: string[];
  loader: any;
  queries: string[];

  constructor(public actionSheetCtrl: ActionSheetController,
              public navCtrl: NavController,
              public config: Config,
              public inAppBrowser: InAppBrowser,
              public companyService: CompanyService,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController,
              private companyQueryService: CompanyQueryService,
              public toastCtrl: ToastController,
              private companyToastService: CompanyToastService) {
    this.getAllCompanies();
    this.companyQueryService.query.subscribe(
      (query: string[]) => {
        if (query) {
          console.log('Query set:');
          console.log(query);
          this.queries = query;
          this.sortCompanies();
        } else {

        }
      }
    );

    this.companyToastService.toastAction.subscribe(
      (toast: string) => {
        if (toast) {
          console.log('Toast received!');
          console.log(toast);
          if (toast == 'create') {
            this.presentToast('Company was added successfully')
          } else if (toast == 'update') {
            this.presentToast('Company was updated successfully')
          }
        } else {

        }
      }
    );

  }

  getAllCompanies() {
    this.presentLoading();
    this.companyService.getCompanies().subscribe(
      response => {
        console.log(response);
        this.companies = response.success;
        this.companies.forEach(item => {
          item.goodsString = '';
          if (item.companyGoods) {
            item.companyGoods.forEach(goods => {
              item.goodsString = item.goodsString + ' ' + goods
            })
          }
        });
        this.sortCompanies();
        // this.goods = [];
        // this.goods = this.companyService.getCompaniesGoods(this.companies);
        this.companiesToDisplay = this.companies;
        this.loader.dismiss();
      },
      error => {

      }
    );
  }

  presentModal(company: Companies) {
    console.log('presentModal()');
    let modal = this.modalCtrl.create(CompanyFormPage, company);
    modal.present();
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 6000
    });
    this.loader.present();
  }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top',
      showCloseButton: true,
      cssClass: 'toast-background'
    });
    toast.present();
  }

  removeCompany(companyName: string) {
    this.companyService.removeCompany(companyName).subscribe(
      response => {
        console.log(response);
        this.getAllCompanies();
      },
      error => {

      }
    );
  }

  sortCompanies() {
    let result: Companies[] = [];
    let companiesForFasterSearch: Companies[] = this.companies;
    console.log(this.queries.length);
    if (this.queries && this.queries.length != 0) {
      console.log('sort');
      this.queries.forEach(query => {
        if (query) {
          query = query.toLocaleLowerCase();
          companiesForFasterSearch.forEach(company => {
            if (company.companyName) {
              if (company.companyName.toLocaleLowerCase().search(query) !== -1) {
                result.push(company);
                // companiesForFasterSearch.splice(companiesForFasterSearch.indexOf(company), 1)
              } else {
                if (company.companyGoods) {
                  company.companyGoods.forEach(goods => {
                    if (goods && goods.toLocaleLowerCase().search(query) !== -1) {
                      result.push(company);
                    }
                  })
                }
              }
            }
          });
        }
      });
      this.companiesToDisplay = result;
    } else {
      console.log('else sort');
      this.companiesToDisplay = this.companies;
    }
  }


  ionViewDidLoad() {

  }

  goToCompanyPage(companySelected: Companies) {
    this.navCtrl.push(CompanyPage, companySelected)
  }

  goToSpeakerTwitter(speaker: any) {
    this.inAppBrowser.create(`https://twitter.com/${speaker.twitter}`, '_blank');
  }
}

