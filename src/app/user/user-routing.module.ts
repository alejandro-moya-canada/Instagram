import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { UserComponent } from './user.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
    // página de logueo de usuarios http://localhost:4200/user
  { path: "user/:userId", component: UserComponent, canActivate: [AuthGuard] }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]

})
export class UserRoutingModule {}