import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  data: string;
  error: string;
  loading: any;

  constructor(
    private http: HttpClient,
    public loadCtrl: LoadingController
  ) {
    this.data = '';
    this.error = '';
  }

  async presentLoading() {
    this.loading = await this.loadCtrl.create({
      message: "Loading..."
    });
    await this.loading.present();
  }
  
  
  async ionViewWillEnter(){
    this.presentLoading();
  this.prepareData().pipe(
    finalize(async () => {
    await this.loading.dismiss();
  })
  )
  .subscribe(res => {
    this.data = JSON.stringify(res);
  }, async err => {
    this.error = `An error occurred, the data could not be retrieved: Status: ${err.status}, Message: ${err.statusText}`;
  });
}

private prepareData(): Observable<object> {
  const urlApi = 'https://api.nigelbpeck.com/';
  return this.http.get(urlApi);
}

  

}
