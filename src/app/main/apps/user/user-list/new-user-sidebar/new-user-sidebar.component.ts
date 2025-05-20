import { Component, OnInit } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { UserModel } from '../../../../models/user.model';

@Component({
  selector: 'app-new-user-sidebar',
  templateUrl: './new-user-sidebar.component.html'
})
export class NewUserSidebarComponent implements OnInit {
  user: UserModel = {
    id: '',
    firstName: '',
    lastName: '',
    fullName: '',
    phone: '',
    email: '',
    userName: '',
    password: '',
    confirmPassword: '',
    role: '',
    isActive: false,
    signature: ''
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
