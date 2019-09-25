import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "./../../services/user.service";
import { first } from "rxjs/operators";
import {
  FormGroup,
  FormBuilder,
  Validators,
  NgForm,
  FormGroupDirective,
  FormControl
} from "@angular/forms";
import { DatePipe } from "@angular/common";
import { ErrorStateMatcher } from "@angular/material";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  returnUrl: any;
  passwordsMatcher = new RepeatPasswordEStateMatcher();
  constructor(
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private service: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  transformDate() {
    this.datePipe.transform(this.form.dob.value, "yyyy-MM-dd"); //whatever format you need.
  }

  get form() {
    return this.registerForm.controls;
  }
  onShowPassword() {
    console.log("show pswd");
  }
  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.errors.console.log();
      console.log("invalid");
      return;
    }
    console.log("Valid Inputs");
    var date = this.datePipe.transform(this.form.dob.value, "yyyy-MM-dd");
    this.service
      .register(
        this.form.name.value,
        this.form.password.value,
        this.form.email.value,
        this.form.contactNumber.value,
        this.form.gendor.value,
        date
      )
      .pipe(first())
      .subscribe(data => {
        if (data.status === "success") {
          this.router.navigate(["home"]);
          console.log(data);
        } else if (data.status === "failure") {
          console.log("Something Wrong");
        }
      });
  }
  RepeatPasswordValidator(group: FormGroup) {
    const password = group.controls.password.value;
    const passwordConfirmation = group.controls.cnfPassword.value;

    return password === passwordConfirmation
      ? null
      : { passwordsNotEqual: true };
  }
  onCancel() {
    this.router.navigate(["/home"]);
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ["", Validators.required],
      password: ["", Validators.required],
      email: ["", Validators.required],
      contactNumber: ["", Validators.required],
      gendor: ["", Validators.required],
      dob: ["", Validators.required],
      cnfPassword: ["", Validators.required]
    });
  }
}
export class RepeatPasswordEStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return (
      control &&
      control.parent.get("password").value !==
        control.parent.get("cnfPassword").value &&
      control.dirty
    );
  }
}
