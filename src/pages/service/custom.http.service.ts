import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

function getToken(): any {
  let token = localStorage.getItem('access_token');
  let header;
  if (!token) {
    header = 'Basic Zm9vQ2xpZW50SWRQYXNzd29yZDpzZWNyZXQ=';
  } else {
    header = 'Bearer '+ localStorage.getItem('access_token') || '';
  }
  return header;
}

@Injectable()
export class CustomHttpService extends Http {

  loading;

  constructor (backend: XHRBackend,
               options: RequestOptions,
               public nl: LoadingController,
               public t: ToastController) {
    super(backend, options);
  }

  // its like interceptor, calls by each methods internally like get, post, put, delete etc
  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    if (typeof url === 'string') {
      if (!options) {
        options = { headers: new Headers() };
      }
      // options.headers.set('Content-Type', 'application/json');
      options.headers.set('Authorization', `${getToken()}`);
    } else {
      // url.headers.set('Content-Type', 'application/json');
      url.headers.set('Authorization', `${getToken()}`);
    }
    return super.request(url, options);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    this.showLoader();
    return Observable.create((observer) => {
      super.get(url, options)
           .subscribe((data) => {
             this.extractData(data, observer);
           }, (err) => {
             this.handleError(err, observer);
           });
    });
  }

  post(url: string, options?: RequestOptionsArgs): Observable<any> {
    this.showLoader();
    return Observable.create((observer) => {
      super.post(url, options)
           .subscribe((data) => {
             observer.next(data.json());
             observer.complete();
             this.hideLoader();
           }, (err) => {
             this.handleError(err, observer);
           });
    });
  }

  put(url: string, options?: RequestOptionsArgs): Observable<any> {
    this.showLoader();
    return Observable.create((observer) => {
      super.put(url, options)
           .subscribe((data) => {
             observer.next(data.json());
             observer.complete();
             this.hideLoader();
           }, (err) => {
             this.handleError(err, observer);
           });
    });
  }

  private extractData(data, observer) {
    this.hideLoader();
    if (data.status === 204) {
      this.showEmptyMessage();
      observer.next(data);
    } else {
      observer.next(data.json());
    }
    observer.complete();
  }

  private handleError(err, observer) {
    this.hideLoader();
    this.showError(err);
    observer.error(err);
  }

  private hideLoader() {
    this.loading.dismiss();
  }

  private showLoader() {
    this.loading = this.nl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  private showError(err) {
    let toast = this.t.create({
      message: err.status + ' - ' + err.statusText,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  private showEmptyMessage() {
    let toast = this.t.create({
      message: "NO RECORDS FOUND",
      dismissOnPageChange: true,
      showCloseButton: true,
      closeButtonText: "Ok",
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

}

@Injectable()
export class CustomHttpServiceForRefresh extends Http {

  constructor (backend: XHRBackend,
               options: RequestOptions,
               public t: ToastController) {
    super(backend, options);
  }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    if (typeof url === 'string') {
      if (!options) {
        options = { headers: new Headers() };
      }
      options.headers.set('Content-Type', 'application/json');
      options.headers.set('Authorization', `${getToken()}`);
    } else {
      url.headers.set('Content-Type', 'application/json');
      url.headers.set('Authorization', `${getToken()}`);
    }
    return super.request(url, options);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    return Observable.create((observer) => {
      super.get(url, options)
           .subscribe((data) => {
             this.extractData(data, observer);
           }, (err) => {
             this.handleError(err, observer);
           });
    });
  }

  post(url: string, options?: RequestOptionsArgs): Observable<any> {
    return Observable.create((observer) => {
      super.post(url, options)
           .subscribe((data) => {
             observer.next(data.json());
             observer.complete();
           }, (err) => {
             this.handleError(err, observer);
           });
    });
  }

  put(url: string, options?: RequestOptionsArgs): Observable<any> {
    return Observable.create((observer) => {
      super.put(url, options)
           .subscribe((data) => {
             observer.next(data.json());
             observer.complete();
             console.log(data);
           }, (err) => {
             console.log(err)
             this.handleError(err, observer);
           });
    });
  }

  private extractData(data, observer) {
    if (data.status === 204) {
      observer.next(data);
      this.showEmptyMessage();
    } else {
      observer.next(data.json());
    }
    observer.complete();
  }

  private handleError(err, observer) {
    this.showError(err);
    observer.error(err);
  }

  private showError(err) {
    let toast = this.t.create({
      message: err.status + ' - ' + err.statusText,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  private showEmptyMessage() {
    let toast = this.t.create({
      message: "NO RECORDS FOUND",
      dismissOnPageChange: true,
      showCloseButton: true,
      closeButtonText: "Ok",
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }
}