import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  spinner: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }
  
  url = 'https://dashboard.fanarah.net/api/';
  lang = sessionStorage.getItem('lang') ?? 'en';

  headers = new HttpHeaders()
    .set('X-localization', sessionStorage.getItem('lang') ?? 'en')
    .set('Accept', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');


  getIsLoading(): Observable<boolean> {
    return this.spinner
  }

  setIsLoading(loading: boolean | any) {
    this.spinner.next(loading);
  }

}
