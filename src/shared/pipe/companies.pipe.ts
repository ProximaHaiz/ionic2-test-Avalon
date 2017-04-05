import {Pipe, PipeTransform} from "@angular/core";
import {Companies} from "../../interface/companies.interface";

@Pipe({
  name: 'companiesPipe'
})
export class CompaniesPipe implements PipeTransform {
  private errorMessage: string;

  transform(companies: Array<Companies>, filter: string): Array<Companies> {
    console.log(filter);
    console.log(companies);
    let result: Companies[] = [];
    filter = filter.toLocaleLowerCase();
    if (filter) {
      companies.forEach(company => {
        if (company.companyName) {
          if (company.companyName.toLocaleLowerCase().search(filter) !== -1) {
            result.push(company);
          } else {
            if (company.companyGoods) {
              company.companyGoods.forEach(goods => {
                if (goods && goods.toLocaleLowerCase().search(filter) !== -1) {
                  result.push(company);
                }
              })
            }
          }
        }
      });
    } else {
      result = companies
      console.log('else');
    }

    // result.sort((a: any, b: any) => {
    //   let companyNameA = a.companyName ? a.companyName.toLocaleLowerCase : a.companyName;
    //   let companyNameB = b.companyName ? b.companyName.toLocaleLowerCase : b.companyName;
    //   if (companyNameA < companyNameB) {
    //     return -1;
    //   } else if (companyNameA > companyNameB) {
    //     return 1;
    //   } else {
    //     return 0;
    //   }
    // });

    return result;
  }
}
