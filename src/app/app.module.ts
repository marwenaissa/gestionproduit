import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment'; // Chemin relatif

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)), // Initialisation de Firebase
    provideFirestore(() => getFirestore()), // Configuration de Firestore
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
