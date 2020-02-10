import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';

const BACKEND_URL = environment.apiUrl + "/post/";

@Injectable({ providedIn: 'root' })
export class PostService {

    constructor( private http: HttpClient, private router: Router ) {}

    getPosts() {
        this.http.get<{ message: string, posts: any }>(BACKEND_URL)
        .pipe(map((postData) => {
            return { posts: postData.posts.map(post => {
                return {
                    id: post._id,
                    contenido: post.contenido,
                    image: post.image,
                    fechaCreacion: post.fechaCreacion
                }
            }) }
        }))
    }

    addPost(jsonData: any) {
        console.log("LLEGO AL SERVICIO!!");
        console.log("JSON EN SERVICIO:  ", jsonData);

        this.http.post<{ message: string, post: Post }>(BACKEND_URL, jsonData)
        .subscribe((responseData) => {
            this.router.navigate(["/"]);
        });
    }
}