import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";


@Injectable()
export default class CompanyQueryService {
  public query: BehaviorSubject<string[]>;

  constructor() {
    let array: string [] = [];
    this.query = new BehaviorSubject(array);
  }

  public getSearchQuery(): string[] {
    return this.query.getValue();
  };

  public setQueryNull() {
    this.query.next(null);
  }

  public setQuery(queries: string[]): void {
    this.query.next(queries);
  };
}
