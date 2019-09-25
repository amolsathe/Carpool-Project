import { ErrorComponent } from './global/error/error.component';
import { AdminListComponent } from "./admin/admin-list/admin-list.component";
import { ManageRideOfferedComponent } from "./user/manage-ride-offered/manage-ride-offered.component";
import { ManageBookingsComponent } from "./user/manage-bookings/manage-bookings.component";
import { LoginHomeComponent } from "./user/login-home/login-home.component";
import { FooterComponent } from "./global/footer/footer.component";
import { FindRideComponent } from "./user/find-ride/find-ride.component";
import { AddRideComponent } from "./user/add-ride/add-ride.component";
import { OfferRideComponent } from "./user/offer-ride/offer-ride.component";
import { UpdateUserComponent } from "./user/update-user/update-user.component";
import { DatePipe } from "@angular/common";
import { UserLoginComponent } from "./global/user-login/user-login.component";
import { SignupComponent } from "./global/signup/signup.component";
import { ListUserComponent } from "./admin/list-user/list-user.component";

import { CustomMaterialModule } from "./material.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { AgmCoreModule } from "@agm/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AgmDirectionModule } from "agm-direction"; // agm-direction
import { AppComponent } from "./app.component";
import { MatNativeDateModule, MAT_DATE_LOCALE } from "@angular/material";
import { HttpClientModule } from "@angular/common/http";
//----
import { HeaderComponent } from "./global/header/header.component";
import { HomeComponent, LoginDialod } from "./global/home/home.component";
import { LoginComponent } from "./admin/login/login.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    ListUserComponent,
    SignupComponent,
    UserLoginComponent,
    LoginDialod,
    UpdateUserComponent,
    OfferRideComponent,
    AddRideComponent,
    FindRideComponent,
    FooterComponent,
    LoginHomeComponent,
    ManageBookingsComponent,
    ManageRideOfferedComponent,
    AdminListComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatNativeDateModule,
    AgmDirectionModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      libraries: ["places"]
    })
  ],
  entryComponents: [LoginDialod],
  providers: [
    MatNativeDateModule,
    { provide: MAT_DATE_LOCALE, useValue: "en-IN" },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
