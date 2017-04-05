import {NgModule} from "@angular/core";

import {ConferenceApp} from "./app.component";
import {CompaniesPipe} from "./pipe/companies.pipe";


@NgModule({
  declarations: [
    CompaniesPipe
  ],
  imports: [],
  // entryComponents: [],
  providers: [],
  exports:[CompaniesPipe]
})
export class SharedModule {
}
