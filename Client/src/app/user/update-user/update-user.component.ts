import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RepeatPasswordEStateMatcher } from "src/app/global/signup/signup.component";
import { DatePipe } from "@angular/common";
import { UserService } from "src/app/services/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";

@Component({
  selector: "app-update-user",
  templateUrl: "./update-user.component.html",
  styleUrls: ["./update-user.component.css"]
})
export class UpdateUserComponent implements OnInit {
  updateForm: FormGroup;
  returnUrl: any;
  maxDate = new Date();
  userData: any = [];
  passwordsMatcher = new RepeatPasswordEStateMatcher();
  constructor(
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private service: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getUserDetails();
  }

  transformDate() {
    this.datePipe.transform(this.form.dob.value, "yyyy-MM-dd"); //whatever format you need.
  }

  get form() {
    return this.updateForm.controls;
  }
  onShowPassword() {
    console.log("show pswd");
  }
  onSubmit() {
    //console.log("inside submit");
    var date = this.datePipe.transform(this.form.dob.value, "yyyy-MM-dd");
    this.service
      .updateUserInfo(
        this.form.name.value,
        this.form.email.value,
        this.form.contactNumber.value,
        this.form.gendor.value,
        date
      )
      .pipe(first())
      .subscribe(data => {
        console.log(data);
        if (data.status === "success") {
          this.router.navigate(["user/home"]);
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
    this.router.navigate(["/user/home"]);
  }
  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      name: [this.userData.name, Validators.required],
      email: [this.userData.emailId, Validators.required],
      contactNumber: [this.userData.contactNumber, Validators.required],
      gendor: [this.userData.gendor, Validators.required],
      dob: [this.userData.dateOfBirth, Validators.required]
    });
    console.log(this.userData.name);
  }

  getUserDetails() {
    this.service.getSingleUser(1).subscribe(data => {
      this.userData = data;
      //console.log(this.userData);
      if (this.userData != undefined) {
        this.updateForm.setValue({
          name: this.userData.name,
          email: this.userData.emailId,
          contactNumber: this.userData.contactNumber,
          gendor: this.userData.gendor,
          dob: this.userData.dateOfBirth
        });
        //this.service.setUserId(this.userData.UserId);
        //console.log("name : " + this.form.name.value);
      }
    });
  }
}
