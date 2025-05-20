import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwalService } from './swal.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private swal : SwalService
  ) { }

  errorHandler(err:HttpErrorResponse){
    let errorMessage = "";
    if(err.status === 403){
      
      for(const e of err.error.errorMessages){
        errorMessage += e + "\n"; 
      }
      console.log(err);      
      this.swal.toastrError(errorMessage);
    }else if (err.status === 500){
      this.swal.toastrError(err.error.errorMessages[0]);
    }else{
      errorMessage = 'Beklenmedik bir hata oluştu. Lütfen tekrar deneyin.';
      this.swal.toastrError(errorMessage);
    }
  }
}