import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { MsalBroadcastService } from '@azure/msal-angular/msal.broadcast.service';
import { MsalGuard } from '@azure/msal-angular/msal.guard';
import { AccountInfo } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'auth';

  access_token = ''

  constructor(private authService: MsalService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
       var loginHint = params['login_hint'];

       this.authService.ssoSilent({
        loginHint,
        scopes: ['user.read']
      }).subscribe(x => {
        this.authService.acquireTokenSilent({
          scopes: ['user.read'],
          account: x.account as AccountInfo
        }).subscribe(y => {
          console.log(y)
          this.access_token = y.accessToken;
        });
        
      });
    })
  }

}
