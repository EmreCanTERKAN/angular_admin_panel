import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreConfigService } from '@core/services/config.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

import { UserListService } from 'app/main/services/user-list.service';

import { SwalService } from '../../../services/swal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { HttpService } from 'app/main/services/http.service';
import { UserModel } from 'app/main/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit {
  // Public
  public sidebarToggleRef = false;
  public rows;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public temp = [];
  public previousRoleFilter = '';
  public previousPlanFilter = '';
  public previousStatusFilter = '';
  
  public selectRole: any = [
    { name: 'All', value: '' },
    { name: 'System', value: 'System' },
    { name: 'Admin', value: 'Admin' },
    { name: 'Reporter', value: 'Reporter' },
    { name: 'Hospital', value: 'Hospital' },
    { name: 'Doctor', value: 'Doctor' },
    { name: 'Company', value: 'Company' }
  ];
  
  public selectPlan: any = [
    { name: 'All', value: '' },
    { name: 'Basic', value: 'Basic' },
    { name: 'Company', value: 'Company' },
    { name: 'Enterprise', value: 'Enterprise' },
    { name: 'Team', value: 'Team' }
  ];
  
  public selectStatus: any = [
    { name: 'All', value: '' },
    { name: 'Active', value: 'Active' },
    { name: 'Inactive', value: 'Inactive' }
  ];
  
  public selectedRole = [];
  public selectedStatus = [];
  public searchValue = '';
  
  updateModel : UserModel = new UserModel();
  createModel : UserModel = new UserModel();

  @ViewChild(DatatableComponent) table: DatatableComponent;


  private tempData = [];
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _userListService: UserListService,
    private _coreSidebarService: CoreSidebarService,
    private _coreConfigService: CoreConfigService,
    private _swal : SwalService,
    private _modalService: NgbModal,
    private _http : HttpService

  ) {
    this._unsubscribeAll = new Subject();
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  modalOpenForm(modalForm) {
    this._modalService.open(modalForm);
  }

  update(form : NgForm) {
    if(form.valid) {
      this._http.post<string>("User/Update",this.updateModel,(res) => {
        this._swal.toastrInfo(res);
      })
    }
  }

  filterUpdate(event) {
    // Sadece arama kutusu için filtreleme
    const val = event.target.value.toLowerCase();
    const temp = this.tempData.filter(function (d) {
      return (
        (d.userName && d.userName.toLowerCase().includes(val)) ||
        (d.fullName && d.fullName.toLowerCase().includes(val)) ||
        (d.email && d.email.toLowerCase().includes(val)) ||
        (d.phone && d.phone.toLowerCase().includes(val)) ||
        !val
      );
    });
    this.rows = temp;
    this.table.offset = 0;
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }


  filterByRole(event) {
    const filter = event ? event.value : '';
    this.previousRoleFilter = filter;
    this.temp = this.filterRows(filter, this.previousStatusFilter);
    this.rows = this.temp;
  }


  filterByPlan(event) {
    const filter = event ? event.value : '';
    this.previousPlanFilter = filter;
    this.temp = this.filterRows(this.previousRoleFilter, this.previousStatusFilter);
    this.rows = this.temp;
  }

  filterByStatus(event) {
    const filter = event ? event.value : '';
    this.previousStatusFilter = filter;
    this.temp = this.filterRows(this.previousRoleFilter, filter);
    this.rows = this.temp;
  }

  filterRows(roleFilter, statusFilter): any[] {
    // Arama kutusunu sıfırla
    this.searchValue = '';
    roleFilter = roleFilter ? roleFilter.toLowerCase() : '';
    statusFilter = statusFilter ? statusFilter.toLowerCase() : '';
    return this.tempData.filter(row => {
      const isRoleMatch = row.role && row.role.toLowerCase().includes(roleFilter) || !roleFilter;
      const isStatusMatch = row.status && row.status.toLowerCase().includes(statusFilter) || !statusFilter;
      return isRoleMatch && isStatusMatch;
    });
  }

  onDelete(row) {
    this._swal.callSwal("Bu kullanıcıyı silmek istediğinize emin misiniz?","Bu işlem geri alınamaz",() => 
      console.log("deneme"),
    "Sil","error")
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe config change
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      //! If we have zoomIn route Transition then load datatable after 450ms(Transition will finish in 400ms)
      if (config.layout.animation === 'zoomIn') {
        setTimeout(() => {
          this._userListService.onUserListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
            this.rows = response;
            this.tempData = this.rows;
          });
        }, 450);
      } else {
        this._userListService.onUserListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
          this.rows = response;
          this.tempData = this.rows;
        });
      }
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
