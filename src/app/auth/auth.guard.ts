import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        // si devuelvo un booleano el router sabrá que la ruta que estoy protegiendo es accesible (TRUE)
        // si devuelvo FALSE el enrutador se negará a llevarme a la ruta
        const isAuth = this.authService.getIsAuth();
        if (!isAuth) {
            // redirecciono al login si no esta logueado
            this.router.navigate(["/auth/login"]);
        }
        return isAuth;
    }
    
}