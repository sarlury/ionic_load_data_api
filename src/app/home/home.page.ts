import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  data: string;


  constructor(
    private http: HttpClient
  ) {
    this.data = '';
  }

  ionViewDidEnter(){
   this.prepareData().subscribe(res => {
     this.data = JSON.stringify(res);
   })
  }

  private prepareData(): Observable<object> {
    const urlApi = 'https://api.nigelbpeck.com/';
    return this.http.get(urlApi);
  }

}
