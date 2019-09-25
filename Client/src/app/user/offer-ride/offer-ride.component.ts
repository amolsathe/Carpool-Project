import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";

@Component({
  selector: "app-offer-ride",
  templateUrl: "./offer-ride.component.html",
  styleUrls: ["./offer-ride.component.css"]
})
export class OfferRideComponent implements OnInit {
  isRider: boolean = false;
  haveCar: boolean = false;
  loading: boolean = true;
  riderForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  get form() {
    return this.riderForm.controls;
  }
  onShowPassword() {
    console.log("show pswd");
  }

  onLicenceSubmit() {
    console.log("inside car submit");
    this.service
      .addRider(this.form.licNumber.value)
      .pipe(first())
      .subscribe(data => {
        console.log(data);
        if (data.status === "success") {
          this.isRider = false;
          this.haveCar = true;
        } else if (data.status === "failure") {
          console.log("Something Wrong");
        }
      });
  }
  onCarSubmit() {
    console.log("inside car submit");
    this.service
      .addCar(
        this.form.carNumber.value,
        this.form.carModel.value,
        this.form.insurance.value,
        this.form.ac.value,
        this.form.chargingPort.value,
        this.form.totalSeats.value
      )
      .pipe(first())
      .subscribe(data => {
        console.log(data);
        if (data.status === "success") {
          this.router.navigate(["/user/addRide"]);
        } else if (data.status === "failure") {
          console.log("Something Wrong");
        }
      });
  }

  onCancel() {
    this.router.navigate(["/user/home"]);
  }

  ngOnInit() {
    this.riderForm = this.formBuilder.group({
      licNumber: ["", Validators.required],
      carNumber: ["", Validators.required],
      carModel: ["", Validators.required],
      totalSeats: [7, Validators.required],
      insurance: [false, Validators.required],
      ac: [false, Validators.required],
      chargingPort: [false, Validators.required]
    });
    this.getUserStatus();
  }
  getUserStatus() {
    this.service.getStatus().subscribe(res => {
      const status = res.data;
      console.log(status);
      if (status == 1) {
        this.loading = false;
        this.isRider = true;
      } else if (status == 2) {
        this.haveCar = true;
        this.loading = false;
      } else if (status == 3) {
        this.router.navigate(["/user/addRide"]);
      } else alert("something wrong !");
    });
  }
}
