import { LoginComponent } from "./../../admin/login/login.component";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "./../../services/user.service";
import { Component, OnInit } from "@angular/core";
import { first } from "rxjs/operators";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-user-login",
  templateUrl: "./user-login.component.html",
  styleUrls: ["./user-login.component.css"]
})
export class UserLoginComponent implements OnInit {
  userLoginForm: FormGroup;
  status: string = "";
  returnUrl: any;

  constructor(
    private formBuilder: FormBuilder,
    private service: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  get form() {
    return this.userLoginForm.controls;
  }
  onSubmit() {
    console.log("inside submit");
    this.service
      .login(this.form.username.value, this.form.password.value)
      .pipe(first())
      .subscribe(data => {
        if (data.status === "success") {
          this.router.navigate(["user/home"]);
          console.log(data.data);
        } else if (data.status === "failure") {
          this.status = "*Invalid Email ID or Password, Please Retry !";
        }
      });
  }

  ngOnInit() {
    this.userLoginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }
}
