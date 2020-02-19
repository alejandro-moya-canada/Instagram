import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  publicaciones: any;
  date: any;
  dataPosts = this.postService.dataPosts;
  BACKEND_URL_IMAGE = environment.apiImage + "/images/";

  constructor(private postService: PostService) { }

  ngOnInit() {
    // al iniciar la aplicación llamo a la función del servidor para recuperar los posts de la bbdd
    //  this.publicaciones = this.postService.getPosts();
    this.refresh();
  }

  public refresh() {
    this.dataPosts = this.postService.getPosts().then(response => {
      //  console.log("REFRESH LISTTTT:  ", response);
      this.dataPosts = response["posts"];
      //  console.log("DTAAAA.  ", this.dataPosts);
    });

  }

}
