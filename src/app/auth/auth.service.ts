import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthData } from './auth-data.model';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
//  import { FooterService } from '../footer/footer.service';


const BACKEND_URL = environment.apiUrl + "/user/";


@Injectable({ providedIn: 'root' })
export class AuthService {

    private isAuthenticated = false;
    private token: string;
    private tokenTimer: any;
    private userId: string;
    private authStatusListener = new Subject<boolean>();

    constructor(private http: HttpClient, private router: Router, 
      //  private footerService: FooterService
      ) {}

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

    createUser(jsonUser: AuthData, jsonAuth: any) {
        const userData = new FormData();
        userData.append("userInfo", JSON.stringify(jsonUser));
        console.log(BACKEND_URL+"signup");

        this.http.post<{ message: string, user: AuthData, token: string, expiresIn: number, userId: string }>(BACKEND_URL+"signup", userData)
        .subscribe((response) => {
            console.log("RESPONSE DATA:  ", response);
            this.router.navigate(['/']);
        });
    }

    login(jsonAuth: any) {
        console.log("AUTH USUARIO EN SERVICIO:  ", jsonAuth);

        this.http.post<{ token: string, expiresIn: number, userId: string }>(BACKEND_URL+"login", jsonAuth)
            .subscribe(response => {
                const token = response.token;
                this.token = token;
                //  console.log("TOKEN:  ", token);

                if(token) {
                    const expiresInDuration = response.expiresIn;
                //    console.log(expiresInDuration);
                    this.setAuthTimer(expiresInDuration);
                    this.isAuthenticated = true;
                    this.userId = response.userId;
                    this.authStatusListener.next(true);

                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);

                    // llamo a la función de guardar datos en el almacenamiento local
                    this.saveAuthData(token, expirationDate, this.userId);
    //                this.footerService.getIdUser();
                    // redirecciono a la página principal
                    this.router.navigate(['/']);
                }
            }, error => {
                this.authStatusListener.next(false);
            });
    }

    autoAuthUser() {
        const authInformation = this.getAuthData();
        console.log("INFORMATION:  ", authInformation);
        if (!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        console.log("EXPIRES:  ", expiresIn);
        if (expiresIn > 0) {
            this.token = authInformation.token;
            console.log("TOKEN:  ", this.token);
            this.isAuthenticated = true;
            this.userId = authInformation.userId;
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }
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

    callLogin(jsonAuth: any) {
        this.login(jsonAuth);
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

    public getAuthData() {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        const userId = localStorage.getItem("userId");
        if (!token || !expirationDate) {
            return;
        }

        return {
            token: token,
            expirationDate: new Date(expirationDate),
            userId: userId
        }
    }
}