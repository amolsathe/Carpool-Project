import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { UserService } from "./../../services/user.service";
import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-manage-ride-offered",
  templateUrl: "./manage-ride-offered.component.html",
  styleUrls: ["./manage-ride-offered.component.css"]
})
export class ManageRideOfferedComponent implements OnInit {
  modify: boolean = false;
  minDate: Date = new Date();
  rideDate: Date;
  rideTime: any;
  ride: any;
  fare: number;
  status: string;
  oRides: any;
  constructor(
    private datePipe: DatePipe,
    private service: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getRideOffered();
  }

  onUpdate(ride: any) {
    this.rideDate = ride.date;
    this.rideTime = ride.rideTime;
    this.fare = ride.fare;
    this.ride = ride;
    this.modify = true;
  }
  onSubmit() {
    this.ride.date = this.rideDate;
    this.ride.rideTime = this.rideTime;
    this.ride.fare = this.fare;
    this.service.updateRide(this.ride).subscribe(res => {
      if (res.status === "success") {
        this.status = "Ride Details Updated Successfully !";
        this.modify = false;
      }
    });
  }
  getRideOffered() {
    this.service.getRidesOffred().subscribe(res => {
      if (res.status === "success") {
        this.oRides = res.data;
      }
    });
  }
}
