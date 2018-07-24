import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from "@angular/core";
import { SocialLoginService } from "./social-login/social-login.service";
import { GlobalLoginStatus } from "./social-login/global-login-status";
import { FacebookLoginService } from "./social-login/impl/facebook/facebook-login-service";
import { LoginService } from "./social-login/login-service";
import { UserDetails } from "./social-login/user-details";
import { flatMap } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  private readonly _faceBookLoginService: LoginService;

  title = "Angular-Social-Login";
  loginStatus: GlobalLoginStatus = {};
  facebookUserDetails?: UserDetails;

  constructor(private readonly _loginService: SocialLoginService) {
    this._faceBookLoginService = this._loginService.impl(FacebookLoginService.ID);
  }

  ngOnInit() {
    this._loginService.loginStatus().subscribe((status) => {
      this.loginStatus = status;
    });
  }

  loginFacebook() {
    this._faceBookLoginService.login()
      .pipe(flatMap((token) => this._faceBookLoginService.userDetails(token)))
      .subscribe((details) => {
        console.log("Facebook User Details: %o", details);
        this.facebookUserDetails = details;
      });
  }

  loginGoogle() {
    console.log("login google");
  }
}
