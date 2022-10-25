import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'


import { Moment } from '../model/Moment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MomentsService {

  // importando como um objeto 
  private baseApiUrl = environment.baseApiUrl

  // importando a url que esta no envoriment 
  private apiUrl = `${this.baseApiUrl}/api/moments`


  constructor(private http:HttpClient) { }


  // metodo post
  createMoment(formData: FormData):Observable<FormData>{
    return this.http.post<FormData>(this.apiUrl, formData);
  }


}
