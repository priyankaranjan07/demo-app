import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, ToastController } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Page1 } from "../pages/ionic-tabs/page1/page1";
import { Page2 } from "../pages/ionic-tabs/page2/page2";
import { TabsPage } from "../pages/ionic-tabs/tabs/tabs";
import { Page3 } from "../pages/ionic-tabs/page3/page3";
import { LoginComponent } from "../pages/login/login";
import { AuthService } from "../pages/service/auth.service";
import { HttpModule, XHRBackend, RequestOptions } from "@angular/http";
import { CustomHttpServiceForRefresh, CustomHttpService } from "../pages/service/custom.http.service";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    Page1,
    TabsPage,
    Page2,
    Page3,
    LoginComponent
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    Page1,
    TabsPage,
    Page2,
    Page3,
    LoginComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    CustomHttpService,
    CustomHttpServiceForRefresh,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {
      provide: CustomHttpServiceForRefresh,
      useFactory: (backend: XHRBackend, defaultOptions: RequestOptions, t: ToastController) => {
        return new CustomHttpServiceForRefresh(backend, defaultOptions, t);
      },
      deps: [XHRBackend, RequestOptions, ToastController]
    }
  ]
})
export class AppModule {}
