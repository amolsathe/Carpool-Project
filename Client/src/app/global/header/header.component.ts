import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  name: string;
  constructor(private router: Router) {}
  loggedIn() {
    if (localStorage.getItem("currentUser")) {
      this.name = localStorage.getItem("currentUser");
      return true;
    }
    return false;
  }
  onLogout() {
    localStorage.removeItem("currentUser");
    window.location.replace("/");
  }

  ngOnInit() {}
}
