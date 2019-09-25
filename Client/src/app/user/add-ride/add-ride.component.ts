import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone
} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { DatePipe } from "@angular/common";
import { UserService } from "src/app/services/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";
import { MapsAPILoader, MarkerManager } from "@agm/core";

@Component({
  selector: "app-add-ride",
  templateUrl: "./add-ride.component.html",
  styleUrls: ["./add-ride.component.css"]
})
export class AddRideComponent implements OnInit {
  addRideForm: FormGroup;
  @ViewChild("searchSrc", { static: true })
  public searchElementRefSrc: ElementRef;
  @ViewChild("searchDest", { static: true })
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

  constructor(
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private service: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private mapAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  transformDate() {
    this.datePipe.transform(this.form.dob.value, "yyyy-MM-dd"); //whatever format you need.
  }

  get form() {
    return this.addRideForm.controls;
  }
  onShowPassword() {
    console.log("show pswd");
  }
  onSubmit() {
    if (this.origin == undefined || this.dest == undefined) return;

    var date = this.datePipe.transform(this.form.rideDate.value, "yyyy-MM-dd");
    this.service
      .addNewRide(
        this.form.distance.value,
        this.form.avilSeats.value,
        this.form.fare.value,
        date,
        this.form.rideTime.value,
        this.form.jurTime.value,
        this.origin.lat,
        this.origin.lng,
        this.dest.lat,
        this.dest.lng,
        this.source,
        this.destination
      )
      .subscribe(data => {
        if (data.status === "success") {
          this.router.navigate(["user/home"]);
          console.log(data);
        } else if (data.status === "failure") {
          console.log("Something Wrong");
        }
      });
  }

  onCancel() {}
  ngOnInit() {
    this.addRideForm = this.formBuilder.group({
      origin: ["", Validators.required],
      destination: ["", Validators.required],
      distance: ["", Validators.required],
      rideDate: ["", Validators.required],
      avilSeats: ["", Validators.required],
      fare: ["", Validators.required],
      rideTime: ["", Validators.required],
      jurTime: ["", Validators.required]
    });
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
          //console.log("Origin ::"+this.source+ "LatLng "+this.origin);

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
          new google.maps.DistanceMatrixService().getDistanceMatrix(
            {
              origins: [this.source],
              destinations: [this.destination],
              travelMode: google.maps.TravelMode.DRIVING,
              avoidHighways: false,
              avoidTolls: false
            },
            (res, status) => {
              console.log(res.rows[0].elements[0].distance.value);
              this.addRideForm.setValue({
                origin: this.source,
                destination: this.destination,
                distance: res.rows[0].elements[0].distance.value / 1000,
                rideDate: "",
                avilSeats: "",
                rideTime: "",
                fare: "",
                jurTime: res.rows[0].elements[0].duration.text
              });
            }
          );
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
