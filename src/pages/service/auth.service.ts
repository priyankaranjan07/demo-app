import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { CustomHttpServiceForRefresh } from "./custom.http.service";

@Injectable()
export class AuthService{

  constructor(private http: CustomHttpServiceForRefresh)
  {}
serverUrl: string;
  access_token: string;
  refresh_token: string;

  login(username: string, password: string) {
    let url = "/oauth/token?grant_type=password&username="+username+"&password="+password;
    return this.http.post('http://nxtlife-testing.ind-cloud.everdata.com'+url, {}, ).map((res) => {
      return res;
    })
  }
  verifyUser(data): Observable<any[]> {
    let url = "/oauth/token?grant_type=password&username="+data.username+"&password="+data.password;
    return this.http.post(this.serverUrl + 'http://nxtlife-testing.ind-cloud.everdata.com', {}).map((res)=> res).catch((err) => err);
  }
  getUserInfo(): Observable<any[]> {
    return this.http.get("http://nxtlife-testing.ind-cloud.everdata.com/management/info").map((res) => res).catch((err) => err);
  }


}



  
