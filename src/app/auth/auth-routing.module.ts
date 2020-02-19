import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    // página de logueo de usuarios http://localhost:4200/auth/login
  { path: "auth/login", component: LoginComponent },
    // página de registro de usuarios http://localhost:4200/auth/signup
  { path: "auth/signup", component: SignupComponent }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRoutingModule {}