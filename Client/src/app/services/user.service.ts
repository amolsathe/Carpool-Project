import { Router } from "@angular/router";
import { HeaderComponent } from "./../global/header/header.component";
import { Observable } from "rxjs";
import { Result } from "./admin.service";
import { environment } from "./../../environments/environment.prod";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class UserService {
  private userId: number;
  private user: string;
  updateDataobsr: boolean;

  constructor(private http: HttpClient, private router: Router) {
    console.log("inside user service ctor " + this.userId);
    if (!localStorage.getItem("currentUser") && this.userId == undefined)
      this.getUserid();
  }

  getUserId(): number {
    return this.userId;
  }
  setUserId(id: number) {
    this.userId = id;
  }

  getUserEmail(): string {
    return this.user;
  }

  login(username: string, password: string): Observable<Result> {
    const body = {
      emailId: username,
      password: password
    };
    //console.log("user: " + username + " pswd : " + password);
    return this.http
      .post<Result>(`${environment.apiUrl}/user/login`, body)
      .pipe(
        map(data => {
          if (data.status === "success") {
            this.user = username;
            this.userId = data.data;
            localStorage.setItem("currentUser", this.user);
          }
          return data;
        })
      );
  }
  register(
    name: string,
    password: string,
    emailId: string,
    contactNumber: string,
    gendor: string,
    date: string
  ): Observable<Result> {
    const body = {
      emailId: emailId,
      name: name,
      contactNumber: contactNumber,
      password: password,
      gendor: gendor,
      dateOfBirth: date,
      isVerified: true
    };
    //console.log(date);
    // const options = {
    //   headers: new HttpHeaders().set("Content-Type", "application/json")
    // };
    return this.http.post<Result>(`${environment.apiUrl}/user/register`, body);
  }
  updateUserInfo(
    name: string,
    emailId: string,
    contactNumber: string,
    gendor: string,
    date: string
  ): Observable<Result> {
    if (this.updateDataobsr) {
      console.log("indise return obsr");
      return null;
    } else {
      console.log(this.getUserId());
      const body = {
        userId: this.userId,
        emailId: emailId,
        name: name,
        contactNumber: contactNumber,
        gendor: gendor,
        dateOfBirth: date,
        verified: true
      };
      const options = {
        headers: new HttpHeaders().set("Content-Type", "application/json")
      };
      return this.http.post<Result>(
        `${environment.apiUrl}/user/update`,
        body,
        options
      );
    }
  }

  getSingleUser(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/user/get/${id}`);
  }

  addCar(
    carNum: any,
    carModel: any,
    insurance: any,
    ac: any,
    chargingPort: any,
    totalSeats: number
  ): Observable<Result> {
    const body = {
      userId: this.userId,
      vehicleNo: carNum,
      carModel: carModel,
      insurance: insurance,
      ac: ac,
      chargingPort: chargingPort,
      totalSeats: totalSeats
    };
    const options = {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    };
    return this.http.post<Result>(
      `${environment.apiUrl}/user/addCar/${this.userId}`,
      body
    );
  }
  getStatus(): Observable<Result> {
    return this.http.get<Result>(
      `${environment.apiUrl}/user/status/${this.userId}`
    );
  }
  addRider(licNo: any): Observable<Result> {
    const body = {
      userId: this.userId,
      licenceNo: licNo,
      verStatus: true
    };
    if (this.userId == undefined) console.log("No userId");
    return this.http.post<Result>(
      `${environment.apiUrl}/user/addRider/${this.userId}`,
      body
    );
  }
  addNewRide(
    distance: number,
    avilSeats: number,
    fare: number,
    date: string,
    rideTime,
    jurTime: string,
    originLat: number,
    originLng: number,
    destLat: number,
    destLng: number,
    source: string,
    dest: string
  ): Observable<Result> {
    //console.log(originLat);
    const body = {
      userId: this.userId,
      origin: source,
      destination: dest,
      distance: distance,
      originLat: originLat,
      originLng: originLng,
      destLat: destLat,
      destLng: destLng,
      date: date,
      rideTime: rideTime,
      availableSeats: avilSeats,
      fare: fare,
      approxTime: jurTime
    };

    return this.http.post<Result>(
      `${environment.apiUrl}/user/addRide/${this.userId}`,
      body
    );
  }
  findRide(
    date: string,
    rideTime: any,
    source: string,
    destination: string,
    originLat: number,
    originLng: number,
    destLat: number,
    destLng: number
  ): Observable<Result> {
    const body = {
      userId: 1,
      origin: source,
      destination: destination,
      originLat: originLat,
      originLng: originLng,
      destLat: destLat,
      destLng: destLng,
      date: date,
      rideTime: rideTime
    };
    //console.log(body);
    return this.http.post<Result>(`${environment.apiUrl}/user/findRide`, body);
  }
  bookRide(rideId: number, bookedSeats: number): Observable<Result> {
    const body = {
      userId: this.userId,
      rideId: rideId,
      seatBooked: bookedSeats
    };
    //console.log(body);
    // httpOptions.headers.append(
    //   "Access-Control-Allow-Origin",
    //   "http://localhost:8080"
    // );
    // httpOptions.headers.append(
    //   "Access-Control-Allow-Methods",
    //   "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    // );
    // httpOptions.headers.append(
    //   "Access-Control-Allow-Headers",
    //   "X-Requested-With,content-type"
    // );
    //httpOptions.headers.append("Access-Control-Allow-Credentials", "true");

    return this.http.post<Result>(`${environment.apiUrl}/user/bookRide`, body);
  }
  getBookedRides(): Observable<Result> {
    if (this.userId == undefined) this.getUserid();
    return this.http.get<Result>(
      `${environment.apiUrl}/user/getBooking/${this.userId}`
    );
  }
  cancelBooking(id: number): Observable<Result> {
    return this.http.get<Result>(
      `${environment.apiUrl}/user/cancelBooking/${id}`
    );
  }
  getUserid() {
    let email = localStorage.getItem("currentUser");
    const body = {
      emailId: email,
      password: " "
    };
    this.http
      .post<Result>(`${environment.apiUrl}/user/getUId`, body)
      .subscribe(res => {
        if (res.status === "success") {
          this.userId = res.data;
          return this.userId;
        }
      });
  }
  updateRide(ride: any): Observable<Result> {
    return this.http.post<Result>(
      `${environment.apiUrl}/user/updateRide`,
      ride
    );
  }
  getRidesOffred(): Observable<Result> {
    return this.http.get<Result>(
      `${environment.apiUrl}/user/getRides/${this.userId}`
    );
  }
}
