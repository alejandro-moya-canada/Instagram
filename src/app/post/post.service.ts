import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';

const BACKEND_URL = environment.apiUrl + "/post/";

@Injectable({ providedIn: 'root' })
export class PostService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<{ posts: Post[] }>();

    dataPosts: any;

    constructor( private http: HttpClient, private router: Router ) {}

    getPosts() {
        console.log("RUTA:  ", BACKEND_URL);
        return new Promise((resolve, reject) => {
            this.http.get(BACKEND_URL +"all").subscribe(response => {
                console.log("RESPONSE  ", response);
                resolve(response["posts"]);
            });
        });

    /*
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
        .subscribe((transformedPostData) => {
            console.log("POST TRANSFORMED:   ", transformedPostData);
            this.posts = transformedPostData.posts;
            console.log("POSTS:   ", this.posts);
            this.postsUpdated.next({ posts: [...this.posts] });
            console.log("ENVIANDO DATOS:  ", this.postsUpdated);

        });
        */
    }

    addPost(jsonData: any, image: File) {
        console.log("LLEGO AL SERVICIO!!");

        const postData = new FormData();
        postData.append("postInfo", JSON.stringify(jsonData))
        postData.append("file", image);
        console.log("POSTDATA:  ", postData.get("file"));

        this.http.post<{ message: string, post: Post }>(BACKEND_URL, postData)
        .subscribe((responseData) => {
            console.log("RESPONSE DATA:  ", responseData);
            this.router.navigate(["/"]);
        });
    }
}