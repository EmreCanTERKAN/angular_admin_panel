import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastrService }  from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor(
    private toastr : ToastrService
  ) { }


  // Success
  toastrSuccess() {
    this.toastr.success('Kullanıcı başarıyla silindi!', 'Başarılı!', {
      toastClass: 'toast ngx-toastr',
      closeButton: true
    });
  }

  // Info
  toastrInfo() {
    this.toastr.info('👋 Chupa chups biscuit brownie gummi sugar plum caramels.', 'Info!', {
      toastClass: 'toast ngx-toastr',
      closeButton: true
    });
  }

  // Warning
  toastrWarning() {
    this.toastr.warning('👋 Icing cake pudding carrot cake jujubes tiramisu chocolate cake.', 'Warning!', {
      toastClass: 'toast ngx-toastr',
      closeButton: true
    });
  }

  // Error
  toastrError(title:string) {
    this.toastr.error(title , 'Hata!', {
      toastClass: 'toast ngx-toastr',
      closeButton: true
    });
  }


  callSwal(title:string , text : string, callBack:()=> void ,confirmButtonText:string = "Sil" , icon: SweetAlertIcon = "question"){
    Swal.fire({
      title: title,
      text: text,
      confirmButtonColor: '#7367F0',
      cancelButtonColor: '#E42728',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: "Vazgeç",
      customClass:{
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ml-1'
      },
      icon: icon
    }).then(res => {
      if(res.isConfirmed){
        callBack();
        Swal.fire({
          icon: 'info',
          title: 'Başarılı!',
          confirmButtonText: 'Kapat',
          text: 'Yapmış olduğunuz işlem başarıyla gerçekleştirildi.',
          customClass: {
            confirmButton: 'btn btn-info'
          }
        });
      }
    })
  }
}

export type SweetAlertIcon = 'success' | 'error' | 'warning' | 'info' | 'question'

