import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CrudProductService} from './service/crud-product.service';
import {HelperService} from './service/helper.service';
import {AuthService} from './service/auth.service';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {AppMaterialModule} from './app-material/app-material.module';
import { ErrorStateMatcher } from '@angular/material/core';
import { TouchedErrorStateMatcher} from './mather/touch-error-state.matcher';
// FireBase
import {environment} from 'src/environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule, BUCKET} from '@angular/fire/storage';

// Components
import {AppComponent} from './app.component';
import {
  ProductOpenButtonComponent,
  ProductEditCreateFormDialogComponent
} from './components/functional/product-editor/product-editor.component';
import {ProductListComponent} from './components/functional/product-list/product-list.component';
import {SwiperConfigInterface, SWIPER_CONFIG, SwiperModule} from 'ngx-swiper-wrapper';
import {AuthGuard} from './auth.guard';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SignInComponent} from './components/login/sign-in/sign-in.component';
import {SignUpComponent} from './components/login/sign-up/sign-up.component';
import {ForgotPasswordComponent} from './components/login/forgot-password/forgot-password.component';
import {VerifyEmailComponent} from './components/login/verify-email/verify-email.component';
import {FileInputConfig, NGX_MAT_FILE_INPUT_CONFIG} from 'ngx-material-file-input';
import { StepFormBuiderComponent } from './components/step-form-buider/step-form-buider.component';
import {HttpClientModule} from "@angular/common/http";
import {TablePageComponent} from "./components/table-page/table-page.component";
import {AgGridModule} from "ag-grid-angular";
import { BasketComponent } from './components/functional/basket/basket.component';
import { BasketItemComponent } from './components/functional/basket-item/basket-item.component';
import {DBConfig, NgxIndexedDBModule} from "ngx-indexed-db";

const routes: Routes = [

  {path: 'sign-in', component: SignInComponent},
  {path: 'register-user', component: SignUpComponent},
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard], children: [
      {
        path: 'product-list',
        component: ProductListComponent
      },
      {
        path: 'table',
        component: TablePageComponent,
      },
      {
        path: 'basket',
        component: BasketComponent
      }
    ]
  },
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'verify-email-address', component: VerifyEmailComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}

];

const dbConfig: DBConfig  = {
  name: 'BasketDB',
  version: 1,
  objectStoresMeta: [{
    store: 'items',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'name', keypath: 'name', options: { unique: true } },
      { name: 'price', keypath: 'price', options: { unique: false } }
    ]
  }]
};

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

const config: FileInputConfig = {
  sizeUnit: 'Octet'
};

@NgModule({
  declarations: [
    AppComponent,
    ProductOpenButtonComponent,
    ProductEditCreateFormDialogComponent,
    ProductListComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    StepFormBuiderComponent,
    TablePageComponent,
    BasketComponent,
    BasketItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    RouterModule.forRoot(routes),
    AgGridModule.withComponents(),
    NgxIndexedDBModule.forRoot(dbConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AppMaterialModule,
    SwiperModule,
    HttpClientModule,
  ],
  providers: [CrudProductService, HelperService, AuthService, AuthGuard,
    {provide: BUCKET, useValue: 'angular-test-983c4.appspot.com'},
    {provide: SWIPER_CONFIG, useValue: DEFAULT_SWIPER_CONFIG},
    {provide: NGX_MAT_FILE_INPUT_CONFIG, useValue: config},
    {provide: ErrorStateMatcher, useClass: TouchedErrorStateMatcher}
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
