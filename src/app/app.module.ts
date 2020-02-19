import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule, MatDividerModule, MatButtonModule, MatInputModule, MatDialogModule, MatCardModule, MatIconModule, MatListModule, MatToolbarRow } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PostCreateComponent } from './post/post-create/post-create.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { PostListComponent } from './post/post-list/post-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { UserRoutingModule } from './user/user-routing.module';

import { AuthInterceptor } from './auth/auth-interceptor';
import { UserComponent } from './user/user.component';
import { ErrorComponent } from './error/error.component';
import { ErrorInterceptor } from './error-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostCreateComponent,
    FooterComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent,
    UserComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthRoutingModule,
    UserRoutingModule,
    MatToolbarModule,
    MatDividerModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    NoopAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}

  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
