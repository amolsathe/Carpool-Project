import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-manage-bookings",
  templateUrl: "./manage-bookings.component.html",
  styleUrls: ["./manage-bookings.component.css"]
})
export class ManageBookingsComponent implements OnInit {
  bookedSeats: number;
  modifySeats: number;
  availableSeat: number[] = [];
  bookedSeat: number[] = [];
  modify: boolean = false;
  seatBooked: number;
  status: string;
  rideId: number;
  bookedRides: any;
  constructor(private service: UserService, private router: Router) {}
  ngOnInit() {
    this.getBookedRides();
  }
  onCancelBooking(bride: any) {
    this.service.cancelBooking(bride.bookId).subscribe(res => {
      if (res.status === "success") {
        this.status = "Canceled Booking Successfully !";
        this.router.navigate(["user/manBooking"]);
        this.getBookedRides();
      }
    });
  }

  onModify(bride: any) {
    for (var i = 1; i <= bride.ride.availableSeats; i++) {
      this.availableSeat.push(i);
    }
    for (var i = 1; i <= bride.seatBooked; i++) {
      this.bookedSeat.push(i);
    }
    this.rideId = bride.rideId;
    this.seatBooked = bride.seatBooked;
    this.modify = true;
  }
  onSubmit() {
    if (!(this.bookedSeats + this.modifySeats >= 1)) {
      this.status = "Plese select Valid Options";
    }
    console.log(this.bookedSeats + this.modifySeats);
    if (confirm("Book " + this.bookedSeats + " seats ?"))
      this.service.bookRide(this.rideId, this.bookedSeats).subscribe(res => {
        if (res.status === "success") {
          alert("Seats Booked");
          this.router.navigate(["/user/home"]);
        } else {
          this.status = "Plese Retry after some time !";
        }
      });
  }
  getBookedRides() {
    this.service.getBookedRides().subscribe(res => {
      if (res.data.length == 0) this.status = "You Have No Bookings !";
      else {
        this.bookedRides = res.data;
      }
    });
  }
}
