import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';

import { CoreCommonModule } from '@core/common.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreSidebarModule } from '@core/components';


import { HospitalListComponent } from './hospital-list/hospital-list.component';
import { NewHospitalSidebarComponent } from './hospital-list/new-hospital-sidebar/new-hospital-sidebar.component';
import { HospitalListService } from './hospital-list/hospital-list.service';

// routing
const routes: Routes = [
  {
    path: 'hospital-list',
    component: HospitalListComponent,
    resolve: {
      uls: HospitalListService
    },
    data: { animation: 'HospitalListComponent' }
  }
];

@NgModule({
  declarations: [HospitalListComponent, NewHospitalSidebarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    Ng2FlatpickrModule,
    NgxDatatableModule,
    CorePipesModule,
    CoreDirectivesModule,
    CoreSidebarModule
  ],
  providers: [HospitalListService]
})
export class HospitalModule {}
