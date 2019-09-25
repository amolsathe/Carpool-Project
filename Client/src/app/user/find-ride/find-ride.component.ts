import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone
} from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { DatePipe } from "@angular/common";
import { UserService } from "src/app/services/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { MapsAPILoader } from "@agm/core";

@Component({
  selector: "app-find-ride",
  templateUrl: "./find-ride.component.html",
  styleUrls: ["./find-ride.component.css"]
})
export class FindRideComponent implements OnInit {
  findRideForm: FormGroup;
  @ViewChild("searchSrc", { static: false })
  public searchElementRefSrc: ElementRef;
  @ViewChild("searchDest", { static: false })
  public searchElementRefDest: ElementRef;
  minDate: Date = new Date();
  maxDate: any = new Date().setDate(30);
  dirSet: boolean = false;
  source: string = "";
  destination: string = "";
  latlngs: any = [];
  origin: LatLng;
  dest: LatLng;
  latlng: any = {};
  public searchControl: FormControl;
  private geoCoder;
  address: any;
  zoom: number = 8;
  lat: number = 17.281099;
  lng: number = 74.180603;
  markers: marker[] = [];
  status: string = "";
  originPlace: google.maps.places.PlaceResult;
  destPlace: google.maps.places.PlaceResult;

  formState: string = "search";
  availableSeat: number[] = [];
  fRides: any[];

  originName: string;
  destinationName: string;
  rideDateBook: string;
  rideTime: string;
  availableSeats: number;
  fare: number;
  bookedSeats: number;
  TotalFare: number;
  rideId: number;
  constructor(
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private service: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private mapAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  rideClicked(ride: any) {
    this.originName = ride.origin;
    this.destinationName = ride.destination;
    this.rideDateBook = this.datePipe.transform(ride.date, "dd-MM-yyyy");
    this.availableSeats = ride.availableSeats;
    this.fare = ride.fare + 0.0;
    this.rideTime = ride.rideTime;
    this.rideId = ride.rideId;
    this.status = "";
    this.formState = "book";
    for (var i = 1; i <= ride.availableSeats; i++) {
      this.availableSeat.push(i);
    }
    //console.log(this.availableSeat);
  }
  onBookedSeatChange() {
    this.TotalFare = this.bookedSeats * this.fare;
  }

  get form() {
    return this.findRideForm.controls;
  }
  onBookRide() {
    if (this.bookedSeats == undefined) {
      this.status = "Select Number of the Seats to be Booked";
      return;
    }
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

  onSubmit() {
    //console.log("on search submit");
    if (this.origin == undefined || this.dest == undefined) {
      console.log("para not set");
      return;
    }

    var date = this.datePipe.transform(this.form.rideDate.value, "yyyy-MM-dd");
    this.service
      .findRide(
        date,
        this.form.rideTime.value,
        this.source,
        this.destination,
        this.origin.lat,
        this.origin.lng,
        this.dest.lat,
        this.dest.lng
      )
      .subscribe(data => {
        this.fRides = data.data;
        console.log(data);
        if (data.status === "success") {
          //this.router.navigate(["home"]);
          if (data.data.length === 0) {
            this.status =
              "Sorry, Currently No Ride Available ! Try another Time.";
          } else {
            this.formState = "select";
          }
        } else if (data.status === "failure") {
          alert("Something Wrong");
        }
      });
  }

  onCancel() {
    this.router.navigate(["user/home"]);
  }
  ngOnInit() {
    this.findRideForm = this.formBuilder.group({
      origin: ["", Validators.required],
      destination: ["", Validators.required],
      rideDate: ["", Validators.required],
      rideTime: ["", Validators.required]
    });
    if (this.formState !== "search") return;
    this.searchControl = new FormControl();
    this.mapAPILoader.load().then(() => {
      this.setCurrentPosition();
      this.geoCoder = new google.maps.Geocoder();

      let autocompleteSrc = new google.maps.places.Autocomplete(
        this.searchElementRefSrc.nativeElement,
        {
          types: ["address"],
          componentRestrictions: { country: "IN" }
        }
      );
      const autocompleteDest = new google.maps.places.Autocomplete(
        this.searchElementRefDest.nativeElement,
        {
          types: ["address"],
          componentRestrictions: { country: "IN" }
        }
      );

      autocompleteSrc.addListener("place_changed", () => {
        this.ngZone.run(() => {
          this.originPlace = autocompleteSrc.getPlace();
          if (
            this.originPlace.geometry === undefined ||
            this.originPlace.geometry === null
          ) {
            return;
          }
          this.origin = {
            lat: this.originPlace.geometry.location.lat(),
            lng: this.originPlace.geometry.location.lng()
          };
          this.source = this.originPlace.formatted_address;
          this.lat = this.originPlace.geometry.location.lat();
          this.lng = this.originPlace.geometry.location.lng();
          console.log(this.origin);

          this.markers.push({
            lat: this.lat,
            lng: this.lng,
            label: "O",
            draggable: true
          });
        });
      });
      autocompleteDest.addListener("place_changed", () => {
        this.ngZone.run(() => {
          this.destPlace = autocompleteDest.getPlace();
          if (
            this.destPlace.geometry === undefined ||
            this.destPlace.geometry === null
          ) {
            return;
          }
          this.dest = {
            lat: this.destPlace.geometry.location.lat(),
            lng: this.destPlace.geometry.location.lng()
          };
          this.destination = this.destPlace.formatted_address;
          this.lat = this.destPlace.geometry.location.lat();
          this.lng = this.destPlace.geometry.location.lng();
          //console.log("Origin ::"+this.destination+ "LatLng "+this.dest.lat);

          this.markers.push({
            lat: this.lat,
            lng: this.lng,
            label: "D",
            draggable: true
          });
          this.dirSet = true;
          // new google.maps.DistanceMatrixService().getDistanceMatrix(
          //   {
          //     origins: [this.source],
          //     destinations: [this.destination],
          //     travelMode: google.maps.TravelMode.DRIVING,
          //     avoidHighways: false,
          //     avoidTolls: false
          //   },
          //   (res, status) => {
          //     //console.log(res.rows[0].elements[0].distance.value);
          //     this.findRideForm.setValue({
          //       origin: this.source,
          //       destination: this.destination,
          //       distance: res.rows[0].elements[0].distance.value / 1000,
          //       rideDate: "",
          //       avilSeats: "",
          //       rideTime: "",
          //       fare: "",
          //       jurTime: res.rows[0].elements[0].duration.text
          //     });
          //   }
          // );
        });
      });
    });
  }
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: any) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log("dragEnd", m, $event);
  }
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lat = pos.coords.latitude;
        this.lng = pos.coords.longitude;
      });
    }
  }
}
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
interface LatLng {
  lat: number;
  lng: number;
}
