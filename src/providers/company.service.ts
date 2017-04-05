import {OnInit, Injectable} from '@angular/core';
import {Companies} from "../interface/companies.interface";
import {Http, URLSearchParams, Headers, RequestOptions} from "@angular/http";
import {API_URL} from "../interface/constans";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class CompanyService implements OnInit {
  companies: Companies[];

  constructor(public http: Http) {
  }

  ngOnInit() {

  }

  getCompanies() {
    return this.http.get(API_URL + 'companies')
      .map(companies => companies.json());
  }

  getCompaniesGoods(companies: Companies[]) {
    let companiesGoods: Set<string> = new Set();
    let goods: string [];
    goods = [];

    companies.forEach(company => {
      if (company.companyGoods) {
        if (company.companyGoods) {
          company.companyGoods.forEach(goods => {
            companiesGoods.add(goods);
          })
        }
      }
    });
    companiesGoods.forEach(x => {
      goods.push(x);
    });
    console.log(companiesGoods);
    return goods;
  }

  public removeCompany(companyName: string) {
    const params = new URLSearchParams();
    let url = API_URL + 'companies/' + companyName;
    let headers: Headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');

    let body: RequestOptions = new RequestOptions();
    body.headers = headers;
    return this.http.delete(url, body)
      .map(res => res.json());
  };


  public createCompany(company: any) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let url: string = API_URL + 'companies';
    return this.http.post(url, JSON.stringify(company), options)
      .map(res => res.json());
  }

  public updateCompany(company: any, oldName: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let url: string = API_URL + 'companies/' + oldName;
    return this.http.put(url, company)
      .map(res => res.json());
  }
}
