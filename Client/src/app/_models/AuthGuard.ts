import { Observable } from "rxjs";
import { UserService } from "src/app/services/user.service";
import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | import("@angular/router").UrlTree
    | Observable<boolean | import("@angular/router").UrlTree>
    | Promise<boolean | import("@angular/router").UrlTree> {
    const currentUser = this.userService.getUserEmail();
    if (currentUser) {
      return true;
    }
    this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
    return false;
  }
  constructor(private router: Router, private userService: UserService) {}
}
