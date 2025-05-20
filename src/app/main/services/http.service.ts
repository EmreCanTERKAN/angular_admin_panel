import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResultModel } from '../models/result.model'; 
import { AuthService } from './auth.service';
import { ErrorService } from './error.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private error: ErrorService
  ) { }

  post<T>(apiUrl:string, body:any, callBack:(res: T)=> void, errorCallBack?:() => void){
    const fullUrl = `${environment.apiUrl}/${apiUrl}`
    
    this.http.post<ResultModel<T>>(fullUrl , body, {
      headers:{
        "Authorization":"Bearer " + this.auth.token
      }
    }).subscribe({
      next:(res) =>{
        if(res.data){
          callBack(res.data);
        }
      },
      error: (err:HttpErrorResponse) =>{
        this.error.errorHandler(err);
        if(errorCallBack){
          errorCallBack();
        }
      }
    })
  }
}