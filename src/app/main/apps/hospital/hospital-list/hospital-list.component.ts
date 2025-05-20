import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreConfigService } from '@core/services/config.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

import { UserListService } from 'app/main/services/user-list.service';
import { HospitalListService } from './hospital-list.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './hospital-list.component.html',
  styleUrls: ['./hospital-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HospitalListComponent implements OnInit {
  // Public
  public sidebarToggleRef = false;
  public rows;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public temp = [];
  public previousRoleFilter = '';
  public previousPlanFilter = '';
  public previousStatusFilter = '';

  public cityList: string[] = [];
  public districtList: string[] = [];
  public selectedCity: string = '';
  public selectedDistrict: string = '';

  public selectStatus: any = [
    { name: 'All', value: '' },
    { name: 'Active', value: 'Active' },
    { name: 'Inactive', value: 'Inactive' }
  ];

  public selectedRole = [];
  public selectedStatus = [];
  public searchValue = '';

  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

  // Private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {HospitalListService} _hospitalListService
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(
    private _hospitalListService: HospitalListService,
    private _coreSidebarService: CoreSidebarService,
    private _coreConfigService: CoreConfigService
  ) {
    this._unsubscribeAll = new Subject();
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * filterUpdate
   *
   * @param event
   */
  filterUpdate(event) {
    this.applyAllFilters();
  }

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  /**
   * Filter By Roles
   *
   * @param event
   */
  filterByRole(event) {
    const filter = event ? event.value : '';
    this.previousRoleFilter = filter;
    this.temp = this.filterRows(filter, this.previousStatusFilter);
    this.rows = this.temp;
  }

  /**
   * Filter By Plan
   *
   * @param event
   */
  filterByPlan(event) {
    const filter = event ? event.value : '';
    this.previousPlanFilter = filter;
    this.temp = this.filterRows(this.previousRoleFilter, this.previousStatusFilter);
    this.rows = this.temp;
  }

  /**
   * Filter By Status
   *
   * @param event
   */
  filterByStatus(event) {
    this.selectedStatus = event ? event.target ? event.target.value : event : '';
    this.applyAllFilters();
  }

  /**
   * Filter Rows
   *
   * @param roleFilter
   * @param statusFilter
   */
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

  filterByCity(event) {
    const city = event ? event.target ? event.target.value : event : '';
    this.selectedCity = city;
    this.updateDistrictList();
    this.applyAllFilters();
  }

  filterByDistrict(event) {
    const district = event ? event.target ? event.target.value : event : '';
    this.selectedDistrict = district;
    this.applyAllFilters();
  }

  updateDistrictList() {
    if (this.selectedCity) {
      const districts = this.tempData
        .filter(row => row.city === this.selectedCity)
        .map(row => row.district)
        .filter((value, index, self) => value && self.indexOf(value) === index);
      this.districtList = districts;
    } else {
      this.districtList = this.tempData
        .map(row => row.district)
        .filter((value, index, self) => value && self.indexOf(value) === index);
    }
  }

  applyAllFilters() {
    let filtered = this.tempData;
    // Metin arama
    const val = this.searchValue ? this.searchValue.toLowerCase() : '';
    if (val) {
      filtered = filtered.filter(d =>
        (d.shortName && d.shortName.toLowerCase().includes(val)) ||
        (d.fullTitle && d.fullTitle.toLowerCase().includes(val)) ||
        (d.authorizedPerson && d.authorizedPerson.toLowerCase().includes(val)) ||
        (d.email && d.email.toLowerCase().includes(val)) ||
        (d.phone && d.phone.toLowerCase().includes(val))
      );
    }
    // Durum filtresi
    if (this.selectedStatus) {
      filtered = filtered.filter(d => d.status === this.selectedStatus);
    }
    // İl filtresi
    if (this.selectedCity) {
      filtered = filtered.filter(d => d.city === this.selectedCity);
    }
    // İlçe filtresi
    if (this.selectedDistrict) {
      filtered = filtered.filter(d => d.district === this.selectedDistrict);
    }
    this.rows = filtered;
    this.table.offset = 0;
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
          this._hospitalListService.onUserListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
            this.rows = response;
            this.tempData = this.rows;
            this.cityList = this.tempData
              .map(row => row.city)
              .filter((value, index, self) => value && self.indexOf(value) === index);
            this.updateDistrictList();
          });
        }, 450);
      } else {
        this._hospitalListService.onUserListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
          this.rows = response;
          this.tempData = this.rows;
          this.cityList = this.tempData
            .map(row => row.city)
            .filter((value, index, self) => value && self.indexOf(value) === index);
          this.updateDistrictList();
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
