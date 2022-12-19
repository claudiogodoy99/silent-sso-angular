import { Component, OnInit } from '@angular/core';
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

  constructor(private authService: MsalService) { }

  ngOnInit(): void {

    //depara
    //mf 1 - 1234,
    //mf 2 - 12345,
    
    this.authService.ssoSilent({
      loginHint: 'claudiogodoy@microsoft.com',
      scopes: ['']
    }).subscribe(x => {
      this.authService.acquireTokenSilent({
        scopes: [''],
        account: x.account as AccountInfo
      }).subscribe(y => {
        console.log(y)
        this.access_token = y.accessToken;
      });
      
    });
  }

}
