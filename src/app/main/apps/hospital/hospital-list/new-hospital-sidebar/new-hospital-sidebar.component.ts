import { Component, OnInit } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { HospitalModel } from '../../../../models/hospital.model';

@Component({
  selector: 'app-new-hospital-sidebar',
  templateUrl: './new-hospital-sidebar.component.html'
})
export class NewHospitalSidebarComponent implements OnInit {
  user: HospitalModel = {
    shortName: '',
    fullTitle: '',
    authorizedPerson: '',
    city: '',
    district: '',
    phone: '',
    email: '',
    address: '',
    taxNumber: '',
    taxOffice: '',
    website: '',
    status: 'active',
    createdAt: ''
  };

  signatures = [
    { id: 'sig1', name: 'Dr. Ahmet Yılmaz' },
    { id: 'sig2', name: 'Dr. Elif Demir' },
  ];

  /**
   * Constructor
   *
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(private _coreSidebarService: CoreSidebarService) {}

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  /**
   * Submit
   *
   * @param form
   */
  submit(form) {
    if (form.valid) {
      this.toggleSidebar('new-user-sidebar');
    }
  }

  ngOnInit(): void {}
}
