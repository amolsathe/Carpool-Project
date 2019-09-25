import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginDialod, {
      width: "500px",
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      this.animal = result;
    });
  }
  ngOnInit() {}
}

@Component({
  selector: "loginDialog",
  templateUrl: "loginDialog.html",
  styleUrls: ["./loginDialog.css"]
})
export class LoginDialod {
  constructor(
    public dialogRef: MatDialogRef<LoginDialod>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
