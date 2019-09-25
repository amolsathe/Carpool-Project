import { AdminService } from "./../../services/admin.service";
import { Component, OnInit } from "@angular/core";
import { first } from "rxjs/operators";

@Component({
  selector: "app-list-user",
  templateUrl: "./list-user.component.html",
  styleUrls: ["./list-user.component.css"]
})
export class ListUserComponent implements OnInit {
  dataSource: any;

  constructor(private adminService: AdminService) {
    this.getUserDetails();
  }

  ngOnInit() {}
  deleteUser(id: number) {
    this.adminService.deleteUser(id).subscribe(res => {
      if (res.status == "success") this.getUserDetails();
    });
  }
  getUserDetails() {
    this.adminService
      .getUsers()
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.dataSource = res;
          console.log(this.dataSource);
        }
      });
  }
}
