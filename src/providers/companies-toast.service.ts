import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";


@Injectable()
export default class CompanyToastService {
  public toastAction: BehaviorSubject<string>;

  constructor() {
    this.toastAction = new BehaviorSubject('');
  }

  public getSearchQuery(): string {
    return this.toastAction.getValue();
  };

  public setToastNull() {
    this.toastAction.next(null);
  }

  public setToast(action: string): void {
    this.toastAction.next(action);
  };
}
