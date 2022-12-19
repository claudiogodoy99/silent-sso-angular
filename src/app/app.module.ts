import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { MsalGuard, MsalModule } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MsalModule.forRoot( new PublicClientApplication({
      auth: {
        clientId: '', 
        authority: 'https://login.microsoftonline.com//',
        redirectUri: 'http://localhost:4200'
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: false, 
      }
    }),
    {
      interactionType: InteractionType.Popup, // MSAL Guard Configuration
      authRequest: {
        scopes: ['https://admin.services.crm.dynamics.com/user_impersonation']
      }
    },  
    {
      interactionType: InteractionType.Popup, // MSAL Interceptor Configuration
      protectedResourceMap: new Map([ 
          ['https://api.com', ['https://admin.services.crm.dynamics.com/user_impersonation']]
      ])
    })
  ],
  providers: [
    MsalGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
