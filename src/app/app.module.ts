import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { MsalGuard, MsalModule } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import {  RouterModule } from '@angular/router';
import { AppRoutingModule } from './approuting/approuting.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule.forRoot( new PublicClientApplication({
      auth: {
        clientId: '{clientId}', 
        authority: 'https://login.microsoftonline.com/{tenantId}/',
        redirectUri: '{}'
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: false, 
      }
    }),
    {
      interactionType: InteractionType.Popup
    }, 
    {
      interactionType: InteractionType.Popup,
      protectedResourceMap: new Map([])
    })
  ],
  providers: [
    MsalGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
