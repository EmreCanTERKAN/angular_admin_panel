import { CoreMenu } from '@core/types';

//? DOC: http://localhost:7777/demo/vuexy-angular-admin-dashboard-template/documentation/guide/development/navigation-menus.html#interface

export const menu: CoreMenu[] = [
  // Apps & Pages
  {
    id: 'apps',
    type: 'section',
    title: 'Uygulamalar',
    translate: 'MENU.APPS.SECTION',
    icon: 'package',
    children: [
      {
        id: 'users',
        title: 'Kullanıcılar',
        translate: 'MENU.APPS.USER.LIST',
        type: 'item',
        icon: 'user',
        url: 'apps/user/user-list'
      },
      {
        id: 'hospitals',
        title: 'Hastaneler',
        type: 'item',
        icon: 'home',
        url: 'apps/hospital/hospital-list'
      }
    ]
  },
  // Forms & Tables
  {
    id: 'forms-table',
    type: 'section',
    title: 'Forms & Tables',
    translate: 'MENU.FT.SECTION',
    icon: 'file-text',
    children: [
      {
        id: 'form-elements',
        title: 'Form Elements',
        translate: 'MENU.FT.ELEMENT.COLLAPSIBLE',
        type: 'collapsible',
        icon: 'copy',
        children: [
          {
            id: 'form-elements-input',
            title: 'Input',
            translate: 'MENU.FT.ELEMENT.INPUT',
            type: 'item',
            icon: 'circle',
            url: 'forms/form-elements/input'
          },
          {
            id: 'form-elements-inputgroups',
            title: 'Input Groups',
            translate: 'MENU.FT.ELEMENT.INPUTGROUPS',
            type: 'item',
            icon: 'circle',
            url: 'forms/form-elements/input-groups'
          },
          {
            id: 'form-elements-inputmask',
            title: 'Input Mask',
            translate: 'MENU.FT.ELEMENT.INPUTMASK',
            type: 'item',
            icon: 'circle',
            url: 'forms/form-elements/input-mask'
          },
          {
            id: 'form-elements-textarea',
            title: 'Textarea',
            translate: 'MENU.FT.ELEMENT.TEXTAREA',
            type: 'item',
            icon: 'circle',
            url: 'forms/form-elements/textarea'
          },
          {
            id: 'form-elements-checkbox',
            title: 'Checkbox',
            translate: 'MENU.FT.ELEMENT.CHECKBOX',
            type: 'item',
            icon: 'circle',
            url: 'forms/form-elements/checkbox'
          },
          {
            id: 'form-elements-radio',
            title: 'Radio',
            translate: 'MENU.FT.ELEMENT.RADIO',
            type: 'item',
            icon: 'circle',
            url: 'forms/form-elements/radio'
          },
          {
            id: 'form-elements-switch',
            title: 'Switch',
            translate: 'MENU.FT.ELEMENT.SWITCH',
            type: 'item',
            icon: 'circle',
            url: 'forms/form-elements/switch'
          },
          {
            id: 'form-elements-select',
            title: 'Select',
            translate: 'MENU.FT.ELEMENT.SELECT',
            type: 'item',
            icon: 'circle',
            url: 'forms/form-elements/select'
          },
          {
            id: 'form-elements-numberInput',
            title: 'Number Input',
            translate: 'MENU.FT.ELEMENT.NUMBERINPUT',
            type: 'item',
            icon: 'circle',
            url: 'forms/form-elements/number-input'
          },
          {
            id: 'form-elements-file-uploader',
            title: 'File Uploader',
            translate: 'MENU.FT.ELEMENT.FILEUPLOADER',
            icon: 'circle',
            type: 'item',
            url: 'forms/form-elements/file-uploader'
          },
          {
            id: 'form-elements-quill-editor',
            title: 'Quill Editor',
            translate: 'MENU.FT.ELEMENT.QUILLEDITOR',
            icon: 'circle',
            type: 'item',
            url: 'forms/form-elements/quill-editor'
          },
          {
            id: 'form-elements-flatpicker',
            title: 'Flatpicker',
            translate: 'MENU.FT.ELEMENT.FLATPICKER',
            type: 'item',
            icon: 'circle',
            url: 'forms/form-elements/flatpickr'
          },
          {
            id: 'form-elements-date-time-icker',
            title: 'Date & Time Picker',
            translate: 'MENU.FT.ELEMENT.DATETIMEPICKER',
            type: 'item',
            icon: 'circle',
            url: 'forms/form-elements/date-time-picker'
          }
        ]
      },
      {
        id: 'form-layouts',
        title: 'Form Layouts',
        translate: 'MENU.FT.LAYOUTS',
        type: 'item',
        icon: 'box',
        url: 'forms/form-layout'
      },
      {
        id: 'form-wizard',
        title: 'Form Wizard',
        translate: 'MENU.FT.WIZARD',
        type: 'item',
        icon: 'package',
        url: 'forms/form-wizard'
      },
      {
        id: 'form-validation',
        title: 'Form Validations',
        translate: 'MENU.FT.VALIDATION',
        type: 'item',
        icon: 'check-circle',
        url: 'forms/form-validation'
      },
      {
        id: 'form-repeater',
        title: 'Form Repeater',
        translate: 'MENU.FT.REPEATER',
        type: 'item',
        icon: 'rotate-cw',
        url: 'forms/form-repeater'
      },
      {
        id: 'tables-table',
        title: 'Table',
        translate: 'MENU.FT.TABLE',
        type: 'item',
        icon: 'server',
        url: 'tables/table'
      },
      {
        id: 'tables-datatable',
        title: 'DataTables',
        translate: 'MENU.FT.DATATABLES',
        type: 'item',
        icon: 'grid',
        url: 'tables/datatables'
      }
    ]
  },
  // Charts & Maps
  {
    id: 'charts-maps',
    type: 'section',
    title: 'Charts & Maps',
    translate: 'MENU.CM.SECTION',
    icon: 'bar-chart-2',
    children: [
      {
        id: 'charts',
        title: 'Charts',
        translate: 'MENU.CM.CHARTS.COLLAPSIBLE',
        type: 'collapsible',
        icon: 'pie-chart',
        badge: {
          title: '2',
          translate: 'MENU.CM.CHARTS.BADGE',
          classes: 'badge-light-danger badge-pill'
        },
        children: [
          {
            id: 'apex',
            title: 'Apex',
            translate: 'MENU.CM.CHARTS.APEX',
            type: 'item',
            icon: 'circle',
            url: 'charts-and-maps/apex'
          },
          {
            id: 'chartJs',
            title: 'ChartJS',
            translate: 'MENU.CM.CHARTS.CHARTJS',
            type: 'item',
            icon: 'circle',
            url: 'charts-and-maps/chartjs'
          }
        ]
      },
      {
        id: 'google-maps',
        title: 'Google Maps',
        translate: 'MENU.CM.MAPS',
        icon: 'map',
        type: 'item',
        url: 'charts-and-maps/google-maps'
      }
    ]
  },
  // Others
  {
    id: 'others',
    type: 'section',
    title: 'Others',
    translate: 'MENU.OTHERS.SECTION',
    icon: 'box',
    children: [
      {
        id: 'menu-levels',
        title: 'Menu Levels',
        translate: 'MENU.OTHERS.LEVELS.COLLAPSIBLE',
        icon: 'menu',
        type: 'collapsible',
        children: [
          {
            id: 'second-level',
            title: 'Second Level',
            translate: 'MENU.OTHERS.LEVELS.SECOND',
            icon: 'circle',
            type: 'item',
            url: '#'
          },
          {
            id: 'second-level1',
            title: 'Second Level',
            translate: 'MENU.OTHERS.LEVELS.SECOND1.COLLAPSIBLE',
            icon: 'circle',
            type: 'collapsible',
            children: [
              {
                id: 'third-level',
                title: 'Third Level',
                translate: 'MENU.OTHERS.LEVELS.SECOND1.THIRD',
                type: 'item',
                url: '#'
              },
              {
                id: 'third-level1',
                title: 'Third Level',
                translate: 'MENU.OTHERS.LEVELS.SECOND1.THIRD1',
                type: 'item',
                url: '#'
              }
            ]
          }
        ]
      },
      {
        id: 'disabled-menu',
        title: 'Disabled Menu',
        translate: 'MENU.OTHERS.DISABLED',
        icon: 'eye-off',
        type: 'item',
        url: '#',
        disabled: true
      },
      {
        id: 'documentation',
        title: 'Documentation',
        translate: 'MENU.OTHERS.DOCUMENTATION',
        icon: 'file-text',
        type: 'item',
        url: 'https://pixinvent.com/demo/vuexy-angular-admin-dashboard-template/documentation',
        externalUrl: true,
        openInNewTab: true
      },
      {
        id: 'raise-support',
        title: 'Raise Support',
        translate: 'MENU.OTHERS.SUPPORT',
        icon: 'life-buoy',
        type: 'item',
        url: 'https://pixinvent.ticksy.com/',
        externalUrl: true,
        openInNewTab: true
      }
    ]
  }
];
