import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthData } from './auth-data.model';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';


const BACKEND_URL = environment.apiUrl + "/user/";


@Injectable({ providedIn: 'root' })
export class AuthService {

    private isAuthenticated = false;
    private token: string;
    private tokenTimer: any;
    private userId: string;
    private authStatusListener = new Subject<boolean>();

    constructor(private http: HttpClient, private router: Router) {}

    getToken() {
        return this.token;
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    getUserId() {
        return this.userId;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    createUser(jsonUser: AuthData) {
        console.log("DATOS DEL USUARIO EN SERVICIO:  ", jsonUser);

        const userData = new FormData();
        userData.append("userInfo", JSON.stringify(jsonUser));
        console.log(BACKEND_URL+"signup");

        this.http.post<{ message: string, user: AuthData }>(BACKEND_URL+"signup", userData)
        .subscribe((responseData) => {
            console.log("RESPONSE DATA:  ", responseData);
            this.router.navigate(["/"]);
        });

    }

    login(jsonAuth: any) {
        console.log("AUTH USUARIO EN SERVICIO:  ", jsonAuth);

        this.http.post<{ token: string, expiresIn: number, userId: string }>(BACKEND_URL+"login", jsonAuth)
            .subscribe(response => {
                const token = response.token;
                this.token = token;
                console.log("TOKEN:  ", token);

                if(token) {
                    const expiresInDuration = response.expiresIn;
                    console.log(expiresInDuration);
                    this.setAuthTimer(expiresInDuration);
                    this.isAuthenticated = true;
                    this.userId = response.userId;
                    this.authStatusListener.next(true);

                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);

                    // llamo a la función de guardar datos en el almacenamiento local
                    this.saveAuthData(token, expirationDate, this.userId);
                    // redirecciono a la página principal
                    this.router.navigate(['/']);
                }
            }, error => {
                this.authStatusListener.next(false);
            });
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.userId = null;
        this.clearAuthData();
        // redirecciono
        this.router.navigate(['/auth/login']);   
    }

    private setAuthTimer(duration: number) {
        console.log("Setting timer: "+ duration);
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }

    private saveAuthData(token: string, expirationDate: Date, userId: string) {
        // añado datos al almacenamiento local
        localStorage.setItem("token", token);
        localStorage.setItem("expiration", expirationDate.toISOString());
        localStorage.setItem("userId", userId);
    }

    private clearAuthData() {
        // borro datos del almacenamiento local
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("userId");
    }
}