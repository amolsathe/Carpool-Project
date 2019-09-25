import { AdminListComponent } from "./admin/admin-list/admin-list.component";
import { AuthGuard } from "./_models/AuthGuard";
import { ManageRideOfferedComponent } from "./user/manage-ride-offered/manage-ride-offered.component";
import { ManageBookingsComponent } from "./user/manage-bookings/manage-bookings.component";
import { LoginHomeComponent } from "./user/login-home/login-home.component";
import { FindRideComponent } from "./user/find-ride/find-ride.component";
import { AddRideComponent } from "./user/add-ride/add-ride.component";
import { OfferRideComponent } from "./user/offer-ride/offer-ride.component";
import { UpdateUserComponent } from "./user/update-user/update-user.component";
import { UserLoginComponent } from "./global/user-login/user-login.component";
import { SignupComponent } from "./global/signup/signup.component";
import { ListUserComponent } from "./admin/list-user/list-user.component";

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./global/home/home.component";
import { LoginComponent } from "./admin/login/login.component";

const routes: Routes = [
  { path: "master/admin", component: LoginComponent },
  { path: "login", component: UserLoginComponent },
  { path: "rs/admin/list", component: ListUserComponent },
  { path: "rs/admin/control", component: AdminListComponent },
  {
    path: "user/update",
    component: UpdateUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "user/offer",
    component: OfferRideComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "user/addRide",
    component: AddRideComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "user/findRide",
    component: FindRideComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "user/home",
    component: LoginHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "user/manBooking",
    component: ManageBookingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "user/manRides",
    component: ManageRideOfferedComponent,
    canActivate: [AuthGuard]
  },
  { path: "home", component: HomeComponent },
  { path: "signup", component: SignupComponent },
  { path: "", component: HomeComponent },
  { path: "**", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
