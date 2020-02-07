import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule, MatDividerModule, MatButtonModule, MatInputModule, MatDialogModule, MatCardModule, MatIconModule, MatListModule, MatToolbarRow } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PostCreateComponent } from './post/post-create/post-create.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatDividerModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
