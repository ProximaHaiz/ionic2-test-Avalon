import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ViewController} from "ionic-angular";
import {Companies} from "../../interface/companies.interface";
import {FormArray, FormControl, FormGroup} from "../../../node_modules/@angular/forms/src/model";
import {FormBuilder} from "../../../node_modules/@angular/forms/src/form_builder";
import {Validators} from "../../../node_modules/@angular/forms/src/validators";
import {CompanyService} from "../../providers/company.service";
import {OnInit} from "../../../node_modules/@angular/core/src/metadata/lifecycle_hooks";
import CompanyToastService from "../../providers/companies-toast.service";


/*
 Generated class for the CompanyForm page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-company-form',
  templateUrl: 'company-form.html'
})
export class CompanyFormPage implements OnInit {
  public title: string;
  public isActionCreate: boolean;
  private oldCompanyName: string;
  public company: Companies;
  companyForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private formBuilder: FormBuilder,
              private companyService: CompanyService,
              private companyToastService: CompanyToastService) {
    this.company = this.navParams.data;
    if (this.navParams.data.companyName) {
      this.title = 'Edit ' + this.company.companyName;
      this.isActionCreate = false;
      this.oldCompanyName = this.company.companyName;
    } else {
      this.title = 'Create new company';
      this.isActionCreate = true;
    }
    this.initForm(formBuilder);
  }

  ngOnInit(): void {
  }

  private initForm(fb: FormBuilder) {
    this.companyForm = fb.group({
      companyName: new FormControl(this.company.companyName, Validators.required),
      companyGoods: this.formBuilder.array([]),
    });
  }

  initCompanyGroups(goods: string []) {
    const control = <FormArray>this.companyForm.controls['companyGoods'];
    if (goods) {
      goods.forEach(item => {
        control.push(this.formBuilder.group({
          goods: [item, Validators.required],
        }));
      });
    } else {
      control.push(this.formBuilder.group({
        goods: ['', Validators.required],
      }));
    }
  }

  initCompanyGoods(goods: string []) {
    let controls: any[] = [];
    goods.forEach(item => {
      controls.push({'goods': [item, Validators.required]})
    });

    return controls;
  }

  submitCompany() {
    let value = this.companyForm.value;
    console.log(value);
    let goods: string[] = [];
    value.companyGoods.forEach((item: any) => {
      goods.push(item.goods);
    });
    let companyToSave = {
      companyName: value.companyName,
      companyGoods: goods
    };
    if (this.isActionCreate) {
      this.companyService.createCompany(companyToSave).subscribe(
        response => {
          console.log(response);
          this.companyToastService.setToast('create');
          this.closeModal();
        },
        error => {

        }
      );
    } else {
      this.companyService.updateCompany(companyToSave, this.oldCompanyName).subscribe(
        response => {
          console.log(response);
          this.companyToastService.setToast('update');
          this.closeModal();
        },
        error => {

        }
      );
    }
  }

  removeCompanyGoods(i: number) {
    const control = <FormArray>this.companyForm.controls['companyGoods'];
    control.removeAt(i);
  }

  addCompanyGoods() {
    // add address to the list
    const control = <FormArray>this.companyForm.controls['companyGoods'];
    control.push(this.formBuilder.group({
      goods: ['', Validators.required],
    }));
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyFormPage');
    this.initCompanyGroups(this.company.companyGoods);

  }

  closeModal() {
    console.log('closeModal()');
    this.viewCtrl.dismiss();
  }

}
