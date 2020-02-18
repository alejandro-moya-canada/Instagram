import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../../../backend/models/user';


const BACKEND_URL_USER = environment.apiUrl + "/user/";

@Injectable({ providedIn: 'root' })
export class userService {

    dataUser: any;

    constructor( private http: HttpClient ) {}

    getUsuario(userId: string) {
        console.log("LLEGO AL SERVICIO, EL ID:  ", userId);
        console.log("RUTA:  ", BACKEND_URL_USER+userId);
        return new Promise ((resolve, reject) => {
            this.http.get(BACKEND_URL_USER + userId).subscribe(response => {
                console.log("RESPONE USER:  ", response);
                resolve(response);
            });
        });
    }

}