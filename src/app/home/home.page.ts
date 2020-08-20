import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  data: string;
  error: string;

  constructor(
    private http: HttpClient,
    public loadCtrl: LoadingController
  ) {
    this.data = '';
    this.error = '';
  }

  async ionViewWillEnter(){
   this.prepareData().subscribe(res => {
     this.data = JSON.stringify(res);
   }, err => {
     this.error = `An error occured: ${err.status}, ${err.statusText}`;
   })
  }

  private prepareData(): Observable<object> {
    const urlApi = 'https://api.nigelbpeck.com/';
    return this.http.get(urlApi);
  }

  async presentLoading() {
    const loading = await this.loadCtrl.create({
      message: "loading..."
    });
    loading.present();
  }

}
