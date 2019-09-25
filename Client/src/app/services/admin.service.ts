import { environment } from "./../../environments/environment.prod";
import { User } from "../_models/models";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AdminService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public data: Observable<String>;
  private UserName: string;

  constructor(private http: HttpClient) {}

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  deleteUser(id: number): Observable<Result> {
    return this.http.get<Result>(`${environment.apiUrl}/delete/${id}`);
  }

  login(username: string, password: string): Observable<Result> {
    const body = {
      emailId: username,
      password: password
    };
    this.UserName = username;
    //console.log("user: " + username + " pswd : " + password);
    // return this.http
    //   .post<any>(`${environment.apiUrl}/master/admin/login`, body)
    //   .pipe(
    //     map(data => {
    //       // login successful if there's a jwt token in the response
    //       if (data) {
    //         // store user details and jwt token in local storage to keep user logged in between page refreshes
    //         localStorage.setItem("currentUser", JSON.stringify(data));
    //         this.currentUserSubject.next(data);
    //         console.log(data);
    //       }
    //       return data;
    //     })
    //   );
    return this.http
      .post<Result>(`${environment.apiUrl}/master/admin/login`, body)
      .pipe(
        map(data => {
          if (data.status === "success") {
            localStorage.setItem("currentUser", this.UserName);
          }
          return data;
        })
      );
  }

  getUsers(): Observable<Result> {
    return this.http.get<Result>(`${environment.apiUrl}/master/admin/list`);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }
}
export interface Result {
  status: string;
  data: any;
}
